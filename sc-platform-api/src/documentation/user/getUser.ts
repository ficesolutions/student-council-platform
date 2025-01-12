import { ApiDocumentationParams } from '../decorators';
import { UserResponse } from '@student-council-platform/utils';

export const UserDocumentationGetUser: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UserResponse,
  },
  badRequest: {
    description: `\n
    InvalidEntityIdException:
      User with such id is not found`,
  },
  unauthorized: true,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user',
    },
  ],
};
