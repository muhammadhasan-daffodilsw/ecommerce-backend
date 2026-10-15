import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsNumber,
  Min,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator';

export class CreateListingDto {
  @ApiProperty({
    description: 'Title of the listing',
    example: 'iPhone 15 Pro',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({
    description: 'UUID of the listing category',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsOptional()
  @IsUUID()
  category_id?: string;

  @ApiProperty({
    description: 'Price of the listing',
    example: 49999,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateListingDto extends PartialType(CreateListingDto) {}

export class ListingResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  seller_id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  category_id?: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
}

export class SearchListingDto {
  q: string | null = null;
  category_id : string|null = null;
  offset: number = 0;
  limit: number = 20;

  constructor(partial: Partial<SearchListingDto>) {
    Object.assign(this, partial);
  }
}
