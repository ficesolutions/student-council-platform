import { ApiDocumentationParams } from '../decorators';
import { UserResponse } from '@student-council-platform/utils';

export const UserDocumentationUpdateUser: ApiDocumentationParams = {
  isAuth: true,
  ok: {
    type: UserResponse,
  },
  badRequest: {
    description: `\n
    InvalidBodyException:
      User with such id not found
      Username must be a string
      Username is too short (min: 2)
      Username is too long (max: 40)
      Username is not correct (a-zA-Z0-9_)
      The password must include at least 1 digit and 1 latin letter
      Password must be a string
      Password is too short (min: 6)
      Password is too long (max: 32)
      First name must be a string
      First name is not correct (ҐЄІЇЬА-ЩЮЯґєіїьа-щюя)
      Last name must be a string
      Last name is not correct (ҐЄІЇЬА-ЩЮЯґєіїьа-щюя)
      Middle name must be a string
      Middle name is not correct (ҐЄІЇЬА-ЩЮЯґєіїьа-щюя)
      Email must be an email
    `,
  },
  unauthorized: true,
  forbidden: true,
  params: [
    {
      name: 'userId',
      required: true,
      description: 'Id of a user',
    },
  ],
};
