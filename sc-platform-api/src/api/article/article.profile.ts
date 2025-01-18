import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Article } from '../../database/entities/article.entity';
import { ArticleResponse } from '@student-council-platform/utils';

@Injectable()
export class ArticleProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, Article, ArticleResponse);
    };
  }
}
