import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtPayload } from '../../security/jwt/jwt.payload';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { SecurityConfigService } from '../../config/security-config.service';
import { RefreshTokenRepository } from '../../database/repositories/refresh-token.repository';
import { Cron } from '@nestjs/schedule';
import { RegisterDTO } from '@student-council-platform/utils';
import { AlreadyRegisteredException } from '../../security/exceptions/already-registered.exception';
import { UserWithRefreshToken } from '../../security/jwt/refresh/refresh.strategy';

@Injectable()
export class AuthService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly config: SecurityConfigService,
  ) {}

  async register (data: RegisterDTO) {
    if (await this.checkIfUserIsRegistered(data)) {
      throw new AlreadyRegisteredException();
    }

    data.password = await this.hashPassword(data.password);
    await this.userRepository.create(data);
  }

  async login (user: User) {
    return {
      accessToken: this.generateToken(user, 'access'),
      refreshToken: await this.createRefreshToken(user),
    };
  }

  async refresh (user: UserWithRefreshToken) {
    const expiresIn = Math.floor((this.getTokenExpTime(user.token.token) - Date.now()) / 1000);

    await this.refreshTokenRepository.deleteById(user.token.id);
    return {
      accessToken: this.generateToken(user, 'access'),
      refreshToken: await this.createRefreshToken(user, { expiresIn }),
    };
  }

  async logout (user: UserWithRefreshToken) {
    await this.refreshTokenRepository.deleteById(user.token.id);
  }

  getTokenExpTime (token: string) {
    return this.jwtService.decode(token).exp * 1000;
  }

  private async checkIfUserIsRegistered (query: { email?: string, username?: string }) {
    const user = await this.userRepository.find({
      OR: [
        { email: query.email },
        { username: query.username },
      ],
    });
    return !!user?.password;
  }

  private async hashPassword (password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  private async createRefreshToken (user: User, options?: JwtSignOptions) {
    await this.clearExpiredTokens(user.id);
    const token = this.generateToken(user, 'refresh', options);

    await this.userRepository.updateById(user.id, {
      refreshTokens: {
        create: {
          token: token,
        },
      },
    });

    await this.clearUserSessions(user);
    return token;
  }

  private async clearUserSessions ({ id }: User) {
    const tokens = await this.refreshTokenRepository.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    for (let i = 0; tokens.length - i > this.config.sessions; i++) {
      await this.refreshTokenRepository.deleteById(tokens[i].id);
    }
  }

  private generateToken (user: User, token: 'access' | 'refresh', options?: JwtSignOptions) {
    const payload = this.createPayload(user);

    return this.jwtService.sign(payload, {
      expiresIn: this.config[`${token}TTL`],
      secret: this.config[`${token}Secret`],
      ...options,
    });
  }

  private createPayload ({ id: sub }: User): JwtPayload {
    return {
      sub,
    };
  }

  @Cron('0 2 * * *')
  private async clearExpiredTokens (userId?: string) {
    const tokens = await this.refreshTokenRepository.findMany({
      where: {
        userId,
      },
    });
    const now = Date.now();

    for (const { id, token } of tokens) {
      if (this.getTokenExpTime(token) <= now) {
        await this.refreshTokenRepository.deleteById(id);
      }
    }
  }
}
