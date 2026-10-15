import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service.js';
import { CreateListingDto, SearchListingDto, UpdateListingDto } from './dto.js';

@Injectable()
export class ListingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createListing(id: string, data: CreateListingDto) {
    return await this.prisma.listings.create({
      data: {
        seller_id: id,
        ...data,
      },
    });
  }

  async getListingById(id: string) {
    return await this.prisma.listings.findUnique({ where: { id } });
  }

  async updateListingById(id: string, data: UpdateListingDto) {
    return await this.prisma.listings.update({
      where: { id },
      data: {
        updated_at: new Date(),
        ...data,
      },
    });
  }

  async searchListings(data: SearchListingDto) {
  const { q, category_id, offset, limit } = data;

  if (!q?.trim()) {
    return this.prisma.listings.findMany({
      where: category_id ? { category_id } : {},
      skip: offset,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  return this.prisma.$queryRaw`
    SELECT
      id,
      seller_id,
      category_id,
      title,
      description,
      price,
      created_at,
      updated_at,
      ts_rank(
        search_vector,
        websearch_to_tsquery('english', ${q})
      ) AS relevance
    FROM public.listings
    WHERE
      search_vector @@ websearch_to_tsquery('english', ${q})
      AND (
        ${category_id ?? null}::uuid IS NULL
        OR category_id = ${category_id ?? null}::uuid
      )
    ORDER BY relevance DESC, created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;
}

async deleteListingById(id : string)
{
  return await this.prisma.listings.delete({where : {id}});
}
}
