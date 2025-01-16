import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import configuration from '../config/configuration';
import { DatabaseModule } from '../database/database.module';
import { AccessModule } from '../security/jwt/access.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './health/health.module';
import { EmailModule } from './email/email.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    AccessModule,
    HealthModule,
    EmailModule,
    ArticleModule,
  ],
})
export class AppModule {}
