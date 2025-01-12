import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { NoPermissionException } from '../exceptions/no-permission-exception';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate (
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (user?.role !== Role.ADMIN) {
      throw new NoPermissionException();
    }
    return true;
  }
}
