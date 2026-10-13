import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repo.js';
import {
  UserMeResponseDto,
  UserResponseDto,
  CreateUserDto,
  PutUserDto,
  PatchUserDto,
} from './dto.js';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getMe(id: string): Promise<UserMeResponseDto> {
    const user = await this.usersRepo.getUserByID(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserMeResponseDto({
      id: user.id,
      username: user.username,
      phone_number: user.phone_number,
      created_at: user.created_at,
      role: user.role,
    });
  }

  async getUserByID(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepo.getUserByID(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserResponseDto({
      id: user.id,
      username: user.username,
      phone_number: user.phone_number,
    });
  }

  async getAuthUserById(id: string): Promise<Object> {
    const user = await this.usersRepo.getUserByID(id);

    if (!user) {
      throw new UnauthorizedException('Invalid access token');
    }

    return { id: user.id, username: user.username, role: user.role };
  }

  async getUserForAuthentication(phone_number: string) {
    return this.usersRepo.getUserByPhoneNumber(phone_number);
  }

  async createUser(
    phone_number: string,
    username: string,
    hashed_password: string,
  ) {
    return this.usersRepo.createUser({
      username: username,
      phone_number: phone_number,
      password_hash: hashed_password,
    });
  }

  async patchUser(
  id: string,
  data: PatchUserDto,
): Promise<UserMeResponseDto> {
  try {
    const user = await this.usersRepo.updateUser(id, data);

    return new UserMeResponseDto({
      id: user.id,
      username: user.username,
      phone_number: user.phone_number,
      created_at: user.created_at,
      role: user.role,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Username or phone number is already in use',
        );
      }

      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
    }

    throw error;
  }
}
}
