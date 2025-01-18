import { Body, Controller, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiEndpoint, GetUser } from '../../documentation/decorators';
import { ArticleResponse, CreateArticleDTO } from '@student-council-platform/utils';
import { AdminGuard } from '../../security/roles/admin.guard';
import { Article } from '../../database/entities/article.entity';
import { AccessGuard } from '../../security/jwt/access/access.guard';
import { ArticleDocumentation } from '../../documentation/article';
import { MapInterceptor } from '@automapper/nestjs';
import { ArticleByIdPipe } from './article.pipe';

@Controller('article')
export class ArticleController {
  constructor (private readonly articleService: ArticleService) {}

  @ApiEndpoint({
    summary: 'Create a new article',
    guards: [AccessGuard, AdminGuard],
    interceptors: MapInterceptor(Article, ArticleResponse),
    documentation: ArticleDocumentation.CREATE,
  })
  @Post()
  async create (
    @Body() body: CreateArticleDTO,
    @GetUser('id') authorId: string,
  ): Promise<ArticleResponse> {
    return this.articleService.create(body, authorId);
  }

  @ApiEndpoint({
    summary: 'Get an article with selected id',
    interceptors: MapInterceptor(Article, ArticleResponse),
    documentation: ArticleDocumentation.GET,
  })
  @Post()
  async getArticle (
    @Param('id', ArticleByIdPipe) id: string,
  ): Promise<ArticleResponse> {
    return this.articleService.getArticle(id);
  }
}
