import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from 'src/documentation/decorators';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';
import { UserDocumentation } from 'src/documentation/user';
import { UserByIdPipe } from './user.pipe';
import { AccessGuard } from 'src/security/jwt/access/access.guard';

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
}
