import { Module } from '@nestjs/common';
import { AccessGuard } from './access/access.guard';
import { LocalGuard } from './local/local.guard';
import { AccessStrategy } from './access/access.strategy';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from '../../config/configuration.module';
import { SecurityConfigService } from '../../config/security-config.service';
import { RefreshGuard } from './refresh/refresh.guard';
import { RefreshStrategy } from './refresh/refresh.strategy';

@Module({
  imports: [
    ConfigurationModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [SecurityConfigService],
      useFactory: (configService: SecurityConfigService) => ({
        secret: configService.accessSecret,
        signOptions: {
          expiresIn: configService.accessTTL,
        },
      }),
    }),
  ],
  providers: [
    AccessGuard,
    RefreshGuard,
    LocalGuard,
    AccessStrategy,
    RefreshStrategy,
    LocalStrategy,
  ],
  exports: [
    AccessGuard,
    LocalGuard,
    RefreshGuard,
  ],
})
export class AccessModule {}
