import { ApiDocumentationParams } from '../decorators';
import { ArticleResponse } from '@student-council-platform/utils/';

export const ArticleDocumentationGetArticle: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ArticleResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      Article with such id is not found`,
  },
  unauthorized: true,
  params: [
    {
      name: 'id',
      required: true,
      description: 'Id of an article',
    },
  ],
};
