import { ApiDocumentationParams } from '../decorators';

export const Register: ApiDocumentationParams = {
  ok: true,
  badRequest: {
    description: `\n
    InvalidBodyException:
      Email cannot be empty
      Email must be a string
      Username must be a string
      Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)
      Password cannot be empty
      Password must be a string
      The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter
      First name cannot be empty
      First name be a string
      Last name cannot be empty
      Last name must be a string
      Middle name must be a string
    `,
  },
};
