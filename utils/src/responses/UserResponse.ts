import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { State, Role } from '../enums';

export class UserResponse {
  @ApiProperty({
    description: 'User\'s id',
  })
    id: string;

  @ApiProperty({
    description: 'User\'s email',
  })
    email: string;

  @ApiPropertyOptional({
    description: 'User\'s username',
  })
    username?: string;

  @ApiProperty({
    description: 'User\'s first name',
  })
    firstName: string;

  @ApiPropertyOptional({
    description: 'User\'s middle name',
  })
    middleName?: string;

  @ApiProperty({
    description: 'User\'s last name',
  })
    lastName: string;

  @ApiProperty({
    description: 'User\'s role',
    enum: Role,
  })
    role: Role;

  @ApiProperty({
    description: 'User\'s state',
    enum: State,
  })
    state: State;
  
  @ApiProperty({
    description: 'User\'s creation timestamp',
    type: Date,
  })
    createdAt: Date;

  @ApiProperty({
    description: 'User\'s last updated timestamp',
    type: Date,
  })
    updatedAt: Date;
}

export class UsersResponse {
  @ApiProperty({
    description: 'An array of information about the user',
    type: [UserResponse],
  })
    data: UserResponse[];
}
