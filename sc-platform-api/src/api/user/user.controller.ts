import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from 'src/documentation/decorators';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';
import { UserDocumentation } from 'src/documentation/user';
import { UserByIdPipe } from './user.pipe';
import { AccessGuard } from 'src/security/jwt/access/access.guard';
import { UpdateUserDTO } from '@student-council-platform/utils/requests/user';
import { UserResponse } from '@student-council-platform/utils';
import { AdminOrMeGuard } from '../../security/roles/admin-or-me.guard';

@ApiTags('User')
@Controller({
  path: '/users',
})
export class UserController {
  constructor (
    private userService: UserService,
    private userMapper: UserMapper,
  ) {}

  @ApiEndpoint({
    summary: 'Return user\'s data',
    guards: AccessGuard,
    documentation: UserDocumentation.GET_USER,
  })
  @Get('/:userId')
  async getUser (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    const user = await this.userService.getUser(userId);
    return this.userMapper.getUser(user);
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
