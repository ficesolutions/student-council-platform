import { Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/database/repositories/user.repository';
import { InvalidEntityIdException } from 'src/security/exceptions/invalid-entity-id.exception';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor (private readonly userRepository: UserRepository) {}

  async transform (userId: string) {
    const user: User = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
    return userId;
  }
}
