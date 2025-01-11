import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyActionsException extends HttpException {
  constructor () {
    super('Too many actions', HttpStatus.TOO_MANY_REQUESTS);
  }
}