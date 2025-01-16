import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationMessages } from '../../validation.util';

export class CreateArticleDTO {
  @ApiProperty({
    description: 'Title of the article',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Title'))
  @IsString(validationMessages.mustBeType('Title', 'a string'))
    title: string;

  @ApiProperty({
    description: 'Content of the article',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Content'))
  @IsString(validationMessages.mustBeType('Content', 'a string'))
    content: string;
}
