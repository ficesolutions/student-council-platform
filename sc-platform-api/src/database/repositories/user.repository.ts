import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { RegisterDTO } from '@student-council-platform/utils';

@Injectable()
export class UserRepository {
  constructor (private readonly prisma: PrismaService) {}

  findMany (where?: Prisma.UserWhereInput,) {
    return this.prisma.user.findMany({ where });
  }

  findById (id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  find (where?: Prisma.UserWhereInput,) {
    return this.prisma.user.findFirst({ where });
  }

  create (data: RegisterDTO): Promise<User> {
    return this.prisma.user.create({ data });
  }

  updateById (id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  deleteById (id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
