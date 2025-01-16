import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { ArticleRepository } from './repositories/article.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    RefreshTokenRepository,
    ArticleRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    RefreshTokenRepository,
    ArticleRepository,
  ],
})
export class DatabaseModule {}
