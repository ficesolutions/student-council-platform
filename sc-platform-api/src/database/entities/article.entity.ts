import { AutoMap } from '@automapper/classes';

export class Article {
  @AutoMap()
    id: string;

  @AutoMap()
    title: string;

  @AutoMap()
    content: string;

  @AutoMap()
    authorId: string;

  @AutoMap()
    createdAt: Date;

  @AutoMap()
    updatedAt: Date;
}
