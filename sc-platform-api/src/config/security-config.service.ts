import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityConfigService {
  constructor (private readonly configService: ConfigService) {}

  get accessSecret () {
    return this.configService.get('security.access.secret');
  }

  get accessTTL () {
    return this.configService.get('security.access.ttl');
  }

  get refreshSecret () {
    return this.configService.get('security.refresh.secret');
  }

  get refreshTTL () {
    return this.configService.get('security.refresh.ttl');
  }

  get sessions () {
    return this.configService.get('security.sessions');
  }
}
