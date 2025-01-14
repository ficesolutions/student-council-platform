import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { NoPermissionException } from '../exceptions/no-permission-exception';
import { Role } from '@student-council-platform/utils';
import { Request } from 'express';

@Injectable()
export class AdminOrMeGuard implements CanActivate {
  constructor () {}

  async canActivate (
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (user.role === Role.ADMIN) {
      return true;
    }

    if (user.id !== request.params.userId) {
      throw new NoPermissionException();
    }

    return true;
  }
}
