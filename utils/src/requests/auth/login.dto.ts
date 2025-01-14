import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ENG_REGEX, NUM_REGEX, validationMessages, validationOptionsMsg } from '../../validation.util';

export class LoginDTO {
  @ApiProperty({
    description: 'Username of the user'
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Username'))
  @IsString(validationMessages.mustBeType('Username', 'a string'))
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
    username: string

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Password'))
  @IsString(validationMessages.mustBeType('Password', 'a string'))
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    validationOptionsMsg('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
    password: string;
}
