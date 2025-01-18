import { Injectable } from '@nestjs/common';
import { UserResponse } from '@student-council-platform/utils/responses';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor (@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile () {
    return (mapper: Mapper) => {
      createMap(mapper, User, UserResponse);
    };
  }
}
