import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiEndpoint, GetUser } from '../../documentation/decorators';
import { ArticleResponse, CreateArticleDTO } from '@student-council-platform/utils';
import { AdminGuard } from '../../security/roles/admin.guard';
import { DbArticle } from '../../database/entities/DbArticle';
import { ArticleMapper } from './article.mapper';
import { AccessGuard } from '../../security/jwt/access/access.guard';
import { ArticleDocumentation } from '../../documentation/article';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Article')
@Controller({
  path: '/article',
})
export class ArticleController {
  constructor (
    private readonly articleService: ArticleService,
    private readonly articleMapper: ArticleMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Create a new article',
    guards: [AccessGuard, AdminGuard],
    documentation: ArticleDocumentation.CREATE,
  })
  @Post()
  async create (
    @Body() body: CreateArticleDTO,
    @GetUser('id') authorId: string,
  ): Promise<ArticleResponse> {
    const article: DbArticle = await this.articleService.create(body, authorId);
    return this.articleMapper.getArticle(article);
  }
}
