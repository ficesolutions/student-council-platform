import { Injectable, PipeTransform } from '@nestjs/common';
import { Article } from '@prisma/client';
import { ArticleRepository } from 'src/database/repositories/article.repository';
import { InvalidEntityIdException } from 'src/security/exceptions/invalid-entity-id.exception';

@Injectable()
export class ArticleByIdPipe implements PipeTransform {
  constructor (private readonly articleRepository: ArticleRepository) {}

  async transform (id: string) {
    const article: Article = await this.articleRepository.findById(id);
    if (!article) {
      throw new InvalidEntityIdException('Article');
    }
    return id;
  }
}
