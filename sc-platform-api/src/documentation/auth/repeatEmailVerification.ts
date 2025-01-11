import { ApiDocumentationParams } from '../decorators';

export const RepeatEmailVerification: ApiDocumentationParams = {
  ok: true,
  tooManyRequests: {
    description: `\n
    TooManyRequestsException:
      Too many actions`,
  },
  badRequest: {
    description: `\n
    NotRegisteredException:
      User with such email is not registered yet

    InvalidBodyException:
      Email is not an email
      Email cannot be empty`,
  },
};