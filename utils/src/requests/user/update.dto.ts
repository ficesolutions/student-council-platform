import { IsEmail, IsString, IsOptional, Matches } from 'class-validator';
import { ENG_REGEX, NUM_REGEX, validationMessages, validationOptionsMsg } from '../../validation.util';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDTO {
  @ApiProperty({
    description: 'Email of the user',
  })
  @IsEmail(undefined, validationMessages.mustBeType('Email', 'an email'))
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsString()
  @Matches(
      new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
      validationOptionsMsg('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'Username of the user'
  })
  @IsString(validationMessages.mustBeType('Username', 'a string'))
  @Matches(
      new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
      validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'First name of the user',
  })
  @IsString(validationMessages.mustBeType('First name', 'a string'))
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'Middle name of the user',
  })
  @IsString(validationMessages.mustBeType('Middle name', 'a string'))
  @IsOptional()
  middleName: string;

  @ApiProperty({
    description: 'Last name of the user',
  })
  @IsString(validationMessages.mustBeType('Last name', 'a string'))
  @IsOptional()
  lastName: string;
}
