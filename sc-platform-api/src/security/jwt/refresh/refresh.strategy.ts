import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CookieUtils } from '../../../utils/cookie.utils';
import { SecurityConfigService } from '../../../config/security-config.service';
import { JwtPayload } from '../jwt.payload';
import { RefreshTokenRepository } from '../../../database/repositories/refresh-token.repository';
import { AccessStrategy } from '../access/access.strategy';
import { Request } from 'express';
import { RefreshToken, User } from '@prisma/client';

export type UserWithRefreshToken = User & { token?: RefreshToken };

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor (
    private readonly config: SecurityConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly accessStrategy: AccessStrategy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(CookieUtils.getRequestJwt('refresh')),
      ignoreExpiration: false,
      secretOrKey: config.refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate (req: Request, payload: JwtPayload) {
    const user: UserWithRefreshToken = await this.accessStrategy.validate(payload);
    const rt = CookieUtils.getRequestJwt('refresh')[0](req);

    const token = await this.refreshTokenRepository.find({
      userId: user.id,
      token: rt,
    });

    if (!token) throw new UnauthorizedException();
    user.token = token;
    return user;
  }
}
