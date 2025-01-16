import { ApiDocumentationParams } from '../decorators';
import { ArticleResponse } from '@student-council-platform/utils';

export const ArticleDocumentationCreate: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: ArticleResponse,
  },
  unauthorized: true,
  forbidden: true,
  badRequest: {
    description: `\n
    InvalidBodyException:
      Title cannot be empty
      Title must be a string
      Content cannot be empty
      Content must be a string
    `,
  },
};
