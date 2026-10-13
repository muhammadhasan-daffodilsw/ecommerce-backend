import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service.js';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(data: {
    user_id: string;
    refresh_token_hash: string;
    expires_at: Date;
    access_token_jti: string;
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

  async findSessionByHash(refresh_token_hash: string) {
    return this.prisma.user_sessions.findUnique({
      where: {
        refresh_token_hash,
        revoked_at: null,
        expires_at: {
          gt: new Date(),
        },
      },
    });
  }

  async revokeAllSessions(user_id: string) {
    return this.prisma.user_sessions.updateMany({
      where: {
        user_id,
        revoked_at: null,
      },
      data: {
        revoked_at: new Date(),
      },
    });
  }

  async revokeSession(refresh_token_hash: string) {
    return this.prisma.user_sessions.update({
      where: { refresh_token_hash, revoked_at: null },
      data: {
        revoked_at: new Date(),
      },
    });
  }
}
