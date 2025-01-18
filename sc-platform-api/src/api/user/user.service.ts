import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor (private readonly userRepository: UserRepository,) {}

  async getUser (userId: string) {
    return this.userRepository.findById(userId);
  }
}
