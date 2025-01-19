import { Role, State } from '@student-council-platform/utils/enums';
import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
    id: string;

  @AutoMap()
    email: string;

  password: string;

  @AutoMap()
    username: string;

  @AutoMap()
    firstName: string;

  @AutoMap()
    middleName: string;

  @AutoMap()
    lastName: string;

  @AutoMap(() => String)
    role: Role;

  @AutoMap(() => String)
    state: State;

  @AutoMap()
    createdAt: Date;

  @AutoMap()
    updatedAt: Date;
}
