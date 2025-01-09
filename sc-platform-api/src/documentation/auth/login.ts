import { ApiDocumentationParams } from '../decorators';
import { LoginDTO } from '@student-council-platform/utils';

export const Login: ApiDocumentationParams = {
  ok: true,
  badRequest: {
    description: `\n
    InvalidBodyException:
      Username cannot be empty
      Username must be a string
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      Password cannot be empty
      Password must be a string
      The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter
    `,
  },
  unauthorized: {
    description: `\n
    UnauthorizedException:
      The password is incorrect`,
  },
  body: {
    type: LoginDTO,
  },
};
