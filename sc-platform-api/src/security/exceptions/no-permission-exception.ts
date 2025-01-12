import { ForbiddenException } from '@nestjs/common';

export class NoPermissionException extends ForbiddenException {
  constructor () {
    super('You do not have permission to perform this action');
  }
}
