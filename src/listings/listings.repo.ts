import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service.js';

@Injectable()
export class ListingRepository {
  constructor(private readonly prisma: PrismaService) {}
}