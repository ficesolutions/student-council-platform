import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';

@Module({
  controllers: [UserController],
  providers: [UserService, UserMapper],
})
export class UserModule {}
