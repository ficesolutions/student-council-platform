import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class ArticleResponse {
  @ApiProperty({
    description: 'Article id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Article title',
  })
  @AutoMap()
    title: string;

  @ApiProperty({
    description: 'Article content',
  })
  @AutoMap()
    content: string;

  @ApiProperty({
    description: 'Author id',
  })
  @AutoMap()
    authorId: string;

  @ApiProperty({
    description: 'Article creation timestamp',
    type: Date,
  })
  @AutoMap()
    createdAt: Date;

  @ApiProperty({
    description: 'Article last updated timestamp',
    type: Date,
  })
  @AutoMap()
    updatedAt: Date;
}
