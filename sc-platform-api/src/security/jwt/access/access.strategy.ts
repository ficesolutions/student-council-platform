import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SecurityConfigService } from '../../../config/security-config.service';
import { CookieUtils } from '../../../utils/cookie.utils';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../database/repositories/user.repository';
import { JwtPayload } from '../jwt.payload';
import { InvalidEntityIdException } from '../../exceptions/invalid-entity-id.exception';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly config: SecurityConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(CookieUtils.getRequestJwt('access')),
      secretOrKey: config.accessSecret,
      ignoreExpiration: false,
    });
  }

  async validate (payload: JwtPayload) {
    if (!payload) throw new UnauthorizedException();

    const user = await this.userRepository.findById(payload.sub);
    if (!user) throw new InvalidEntityIdException('User');

    delete user.password;
    return user;
  }
}
