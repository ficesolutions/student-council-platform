import { BadRequestException } from '@nestjs/common';

export class NotRegisteredException extends BadRequestException {
  constructor (field: string) {
    super(`User with such ${field} is not registered yet`);
  }
}