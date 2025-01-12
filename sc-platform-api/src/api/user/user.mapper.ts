import { Injectable } from '@nestjs/common';
import { DbUser } from '../../database/entities/DbUser';
import { UserResponse } from '@student-council-platform/utils/responses';

@Injectable()
export class UserMapper {
  getUser (user: DbUser): UserResponse {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      role: user.role,
      state: user.state,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
