import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service.js';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // CREATE
  async createUser(data: {
    username: string;
    phone_number: string;
    password_hash: string;
  }) {
    return this.prisma.users.create({
      data,
    });
  }

  // READ: By ID
  async getUserByID(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  // READ: By Phone Number
  async getUserByPhoneNumber(phone_number: string) {
    return this.prisma.users.findUnique({
      where: { phone_number },
    });
  }

  // READ: By Username
  async getUserByUsername(username: string) {
    return this.prisma.users.findUnique({
      where: { username },
    });
  }

  // READ: All Users
  async getAllUsers() {
    return this.prisma.users.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  // UPDATE
  async updateUser(
    id: string,
    data: {
      username?: string;
      phone_number?: string;
      password_hash?: string;
    },
  ) {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async deleteUser(id: string) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
