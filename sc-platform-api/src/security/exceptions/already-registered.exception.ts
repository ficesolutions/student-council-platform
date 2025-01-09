import { BadRequestException } from '@nestjs/common';

export class AlreadyRegisteredException extends BadRequestException {
  constructor () {
    super('User is already registered');
  }
}
