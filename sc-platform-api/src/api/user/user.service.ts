import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UpdateUserDTO } from '@student-council-platform/utils';
import { DbUser } from '../../database/entities/DbUser';

@Injectable()
export class UserService {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async getUser (userId: string) {
    return this.userRepository.findById(userId);
  }

  async updateUser (userId: string, data: UpdateUserDTO): Promise<DbUser> {
    return this.userRepository.updateById(userId, data);
  }
}
