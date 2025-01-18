import { Controller, Get, Param } from '@nestjs/common';
import { ApiEndpoint } from 'src/documentation/decorators';
import { UserService } from './user.service';
import { UserDocumentation } from 'src/documentation/user';
import { UserByIdPipe } from './user.pipe';
import { AccessGuard } from 'src/security/jwt/access/access.guard';
import { MapInterceptor } from '@automapper/nestjs';
import { User } from '../../database/entities/user.entity';
import { UserResponse } from '@student-council-platform/utils/responses';

@Controller('users')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @ApiEndpoint({
    summary: 'Return user\'s data',
    guards: AccessGuard,
    interceptors: MapInterceptor(User, UserResponse),
    documentation: UserDocumentation.GET_USER,
  })
  @Get('/:userId')
  async getUser (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.userService.getUser(userId);
  }
}
