import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service.js';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createSession(data: {
    user_id: string;
    refresh_token_hash: string;
    expires_at: Date;
  }) {
    return this.prisma.user_sessions.create({
      data,
    });
  }

  async findSessionById(id: string) {
    return this.prisma.user_sessions.findUnique({
      where: { id },
    });
  }

  async revokeSession(id: string) {
    return this.prisma.user_sessions.update({
      where: { id },
      data: {
        revoked_at: new Date(),
      },
    });
}
}