import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleProfile } from './article.profile';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleProfile],
})
export class ArticleModule {}
