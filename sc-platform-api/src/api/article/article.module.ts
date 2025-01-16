import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleMapper } from './article.mapper';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleMapper],
})
export class ArticleModule {}
