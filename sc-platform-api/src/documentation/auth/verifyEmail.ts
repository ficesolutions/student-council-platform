import { ApiDocumentationParams } from '../decorators';

export const VerifyEmail: ApiDocumentationParams = {
  ok: true,
  badRequest: {
    description: `\n
    NotRegisteredException:
      User with such id is not registered yet

    AlreadyRegisteredException:
      User is already registered`,
  },
};