import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../../database/repositories/article.repository';
import { CreateArticleDTO } from '@student-council-platform/utils';
import { Article } from '../../database/entities/article.entity';

@Injectable()
export class ArticleService {
  constructor (private readonly articleRepository: ArticleRepository,) {}

  async create (
    data: CreateArticleDTO,
    authorId: string,
  ): Promise<Article> {
    return this.articleRepository.create(data, authorId);
  }

  async getArticle (id: string) {
    return this.articleRepository.findById(id);
  }
}
