import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateArticleDTO } from '@student-council-platform/utils/requests/article';
import { Article } from '../entities/article.entity';

@Injectable()
export class ArticleRepository {
  constructor (private readonly prisma: PrismaService,) {}

  create (
    data: CreateArticleDTO,
    authorId: string
  ): Promise<Article> {
    return this.prisma.article.create({
      data: {
        ...data,
        authorId,
      },
    });
  }
  
  async findById (id: string): Promise<Article> {
    return this.prisma.article.findUnique({
      where: { id },
    }) as any as Article;
  }
}
