import { ApiDocumentationParams } from '../decorators';
import { UpdateDTO, UserResponse } from '@student-council-platform/utils';

export const UserDocumentationUpdateUser: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UserResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      Username must be a string
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter
      Password must be a string
      First name must be a string
      Last name must be a string
      Middle name must be a string
      Email must be a string
      Email must be an email
    `,
  },
  unauthorized: true,
  body: {
    type: UpdateDTO,
  },
};
