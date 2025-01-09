import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
    }),
  ],
  providers: [],
})
export class AppModule {}
