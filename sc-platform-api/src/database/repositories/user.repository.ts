import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { RegisterDTO } from '@student-council-platform/utils';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor (private readonly prisma: PrismaService) {}

  async findMany (where?: Prisma.UserWhereInput): Promise<User[]> {
    return this.prisma.user.findMany({
      where,
    }) as Promise<User[]>;
  }

  async findById (id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    }) as Promise<User>;
  }

  async find (where?: Prisma.UserWhereInput): Promise<User> {
    return this.prisma.user.findFirst({
      where,
    }) as Promise<User>;
  }

  async create (data: RegisterDTO): Promise<User> {
    return this.prisma.user.create({
      data,
    }) as Promise<User>;
  }

  async updateById (id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    }) as Promise<User>;
  }

  async deleteById (id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    }) as Promise<User>;
  }

  async deleteMany (where: Prisma.UserWhereInput) {
    return this.prisma.user.deleteMany({ where });
  }
}
