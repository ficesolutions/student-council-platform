import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiEndpoint } from 'src/documentation/decorators';
import { UserService } from './user.service';
import { UserDocumentation } from 'src/documentation/user';
import { UserByIdPipe } from './user.pipe';
import { AccessGuard } from 'src/security/jwt/access/access.guard';
import { UpdateUserDTO } from '@student-council-platform/utils/requests/user';
import { AdminOrMeGuard } from '../../security/roles/admin-or-me.guard';
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

  @ApiEndpoint({
    summary: 'Update user\'s data',
    guards: [AccessGuard, AdminOrMeGuard],
    documentation: UserDocumentation.UPDATE_USER,
  })
  @Patch('/:userId')
  async updateUser (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: UpdateUserDTO,
  ): Promise<UserResponse> {
    const user = await this.userService.updateUser(userId, body);
    return this.userMapper.getUser(user);
  }
}
