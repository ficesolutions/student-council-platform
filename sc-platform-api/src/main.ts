import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);

  console.info(`Server started on http://localhost:${port}/\n`);
}
bootstrap();
