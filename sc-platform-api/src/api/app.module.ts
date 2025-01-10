import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
    }),
    HealthModule,
  ],
  providers: [],
})
export class AppModule {}
