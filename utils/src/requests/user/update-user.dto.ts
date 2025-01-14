import { IsEmail, IsString, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { ENG_REGEX, NUM_REGEX, UKR_REGEX, validationMessages, validationOptionsMsg } from '../../validation.util';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    description: 'Email of the user',
  })
  @IsEmail(undefined, validationMessages.mustBeType('Email', 'an email'))
  @IsOptional()
    email?: string;

  @ApiPropertyOptional({
    description: 'Password of the user',
  })
  @IsString(validationMessages.mustBeType('Password', 'a string'))
  @MinLength(6, validationOptionsMsg('Password is too short (min: 6)'))
  @MaxLength(32, validationOptionsMsg('Password is too long (max: 32)'))
  @Matches(
      new RegExp(/^(?=.*[A-Za-z])(?=.*\d).*$/),
      validationOptionsMsg('The password must include at least 1 digit and 1 latin letter'))
  @IsOptional()
    password?: string;

  @ApiPropertyOptional({
    description: 'Username of the user',
  })
  @IsString(validationMessages.mustBeType('Username', 'a string'))
  @MinLength(2, validationOptionsMsg('Username is too short (min: 2)'))
  @MaxLength(40, validationOptionsMsg('Username is too long (max: 40)'))
  @Matches(
      new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']*$'),
      validationOptionsMsg('Username is not correct (a-zA-Z0-9_)'))
  @IsOptional()
    username?: string;

  @ApiPropertyOptional({
    description: 'First name of the user',
  })
  @IsString(validationMessages.mustBeType('First name', 'a string'))
  @Matches(
      new RegExp('['+UKR_REGEX+']'),
      validationOptionsMsg('First name is not correct (ҐЄІЇЬА-ЩЮЯґєіїьа-щюя)'))
  @IsOptional()
    firstName?: string;

  @ApiPropertyOptional({
    description: 'Middle name of the user',
  })
  @Matches(
      new RegExp('['+UKR_REGEX+']'),
      validationOptionsMsg('Middle name is not correct (ҐЄІЇЬА-ЩЮЯґєіїьа-щюя)'))
  @IsString(validationMessages.mustBeType('Middle name', 'a string'))
  @IsOptional()
    middleName?: string;

  @ApiPropertyOptional({
    description: 'Last name of the user',
  })
  @Matches(
      new RegExp('['+UKR_REGEX+']'),
      validationOptionsMsg('Last name is not correct (ҐЄІЇЬА-ЩЮЯґєіїьа-щюя)'))
  @IsString(validationMessages.mustBeType('Last name', 'a string'))
  @IsOptional()
    lastName?: string;
}
