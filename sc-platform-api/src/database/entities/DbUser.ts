import { State, Role } from '@student-council-platform/utils/enums';

export class DbUser {
  id: string;
  email: string;
  password: string;
  username: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  role: Role;
  state: State;
  createdAt: Date;
  updatedAt: Date;
}