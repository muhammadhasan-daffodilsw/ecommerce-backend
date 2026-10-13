import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';
import { UsersModule } from '../users/users.module.js';
import { AuthRepository } from './auth.repo.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UsersService],
})
export class AuthModule {}
