import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponse {
  @ApiProperty({
    description: 'Article id',
  })
    id: string;

  @ApiProperty({
    description: 'Article title',
  })
    title: string;

  @ApiProperty({
    description: 'Article content',
  })
    content: string;

  @ApiProperty({
    description: 'Author id',
  })
    authorId: string;

  @ApiProperty({
    description: 'Article creation timestamp',
    type: Date,
  })
    createdAt: Date;

  @ApiProperty({
    description: 'Article last updated timestamp',
    type: Date,
  })
    updatedAt: Date;
}
