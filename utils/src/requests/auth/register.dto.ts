import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ENG_REGEX, NUM_REGEX, validationMessages, validationOptionsMsg } from '../../validation.util';

export class RegisterDTO {
  @ApiProperty({
    description: 'Email of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Email'))
  @IsEmail(undefined, validationMessages.mustBeType('Email', 'an email'))
    email: string;

  @ApiPropertyOptional({
    description: 'Username of the user',
  })
  @IsOptional()
  @IsString(validationMessages.mustBeType('Username', 'a string'))
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
    username?: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Password'))
  @IsString(validationMessages.mustBeType('Password', 'a string'))
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    validationOptionsMsg('The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter'))
    password: string;

  @ApiProperty({
    description: 'First name of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('First name'))
  @IsString(validationMessages.mustBeType('First name', 'a string'))
    firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Last name'))
  @IsString(validationMessages.mustBeType('Last name', 'a string'))
    lastName: string;

  @ApiPropertyOptional({
    description: 'Middle name of the user',
  })
  @IsOptional()
  @IsString(validationMessages.mustBeType('Middle name', 'a string'))
    middleName?: string;
}
