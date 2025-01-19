import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { State, Role } from '../../enums';
import { AutoMap } from '@automapper/classes';

export class UserResponse {
  @ApiProperty({
    description: 'User\'s id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'User\'s email',
  })
  @AutoMap()
    email: string;

  @ApiPropertyOptional({
    description: 'User\'s username',
  })
  @AutoMap()
    username?: string;

  @ApiProperty({
    description: 'User\'s first name',
  })
  @AutoMap()
    firstName: string;

  @ApiPropertyOptional({
    description: 'User\'s middle name',
  })
  @AutoMap()
    middleName?: string;

  @ApiProperty({
    description: 'User\'s last name',
  })
  @AutoMap()
    lastName: string;

  @ApiProperty({
    description: 'User\'s role',
    enum: Role,
  })
  @AutoMap()
    role: Role;

  @ApiProperty({
    description: 'User\'s state',
    enum: State,
  })
  @AutoMap()
    state: State;

  @ApiProperty({
    description: 'User\'s creation timestamp',
    type: Date,
  })
  @AutoMap()
    createdAt: Date;

  @ApiProperty({
    description: 'User\'s last updated timestamp',
    type: Date,
  })
  @AutoMap()
    updatedAt: Date;
}

export class UsersResponse {
  @ApiProperty({
    description: 'An array of information about the user',
    type: [UserResponse],
  })
    data: UserResponse[];
}
