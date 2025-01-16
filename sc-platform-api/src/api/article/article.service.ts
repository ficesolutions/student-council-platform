import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../../database/repositories/article.repository';
import { CreateArticleDTO } from '@student-council-platform/utils';
import { DbArticle } from '../../database/entities/DbArticle';

@Injectable()
export class ArticleService {
  constructor (
    private articleRepository: ArticleRepository,
  ) {}

  async create (
    data: CreateArticleDTO,
    authorId: string,
  ): Promise<DbArticle> {
    return this.articleRepository.create(data, authorId);
  }
}
