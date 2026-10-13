import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { DatabaseModule } from '../database/database.module.js';
import { UsersRepository } from './users.repo.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports : [DatabaseModule],
  exports:[UsersService, UsersRepository]
})
export class UsersModule {}
