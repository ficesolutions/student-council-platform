import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { SecurityConfigService } from './security-config.service';

@Global()
@Module({
  providers: [SecurityConfigService],
  exports: [SecurityConfigService],
})
export class ConfigurationModule extends ConfigModule {}
