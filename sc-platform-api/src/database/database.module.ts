import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    RefreshTokenRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    RefreshTokenRepository,
  ],
})
export class DatabaseModule {}
