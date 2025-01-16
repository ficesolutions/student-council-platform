import { Injectable } from '@nestjs/common';
import { DbArticle } from '../../database/entities/DbArticle';
import { ArticleResponse } from '@student-council-platform/utils';

@Injectable()
export class ArticleMapper {
  getArticle (
    article: DbArticle
  ): ArticleResponse {
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      authorId: article.authorId,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }
}
