import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service.js';
import { ListingsController } from './listings.controller.js';
import { ListingRepository } from './listings.repo.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ListingsController],
  providers: [ListingsService, ListingRepository],
})
export class ListingsModule {}
