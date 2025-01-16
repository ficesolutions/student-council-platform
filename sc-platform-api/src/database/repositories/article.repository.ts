import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateArticleDTO } from '@student-council-platform/utils';
import { DbArticle } from '../entities/DbArticle';

@Injectable()
export class ArticleRepository {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  create (
    data: CreateArticleDTO,
    authorId: string
  ): Promise<DbArticle> {
    return this.prisma.article.create({
      data: {
        ...data,
        authorId,
      },
    });
  }
}
