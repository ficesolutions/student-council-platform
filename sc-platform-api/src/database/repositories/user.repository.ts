import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { RegisterDTO } from '@student-council-platform/utils';
import { DbUser } from '../entities/DbUser';

@Injectable()
export class UserRepository {
  constructor (private readonly prisma: PrismaService) {}

  findMany (where?: Prisma.UserWhereInput,) {
    return this.prisma.user.findMany({ 
      where,
    }) as any as DbUser;
  }

  findById (id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    }) as any as DbUser;
  }

  find (where?: Prisma.UserWhereInput,) {
    return this.prisma.user.findFirst({ 
      where,
    }) as any as DbUser;
  }

  create (data: RegisterDTO): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  updateById (id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    }) as any as DbUser;
  }

  deleteById (id: string) {
    return this.prisma.user.delete({
      where: { id },
    }) as any as DbUser;
  }

  deleteMany (where: Prisma.UserWhereInput) {
    return this.prisma.user.deleteMany({ where });
  }
}
