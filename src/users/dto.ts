import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsUUID,
  IsOptional,
} from 'class-validator';

// POST /users
export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone_number: string;

  @ApiProperty({ minLength: 8, maxLength: 128 })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

// General user response
export class UserResponseDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: '+919876543210' })
  phone_number: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

// GET /users/me
export class UserMeResponseDto extends UserResponseDto {
  constructor(partial: Partial<UserMeResponseDto>) {
    super(partial as Partial<UserResponseDto>);
    Object.assign(this, partial);
  }
  @ApiProperty({ example: '2026-10-13T09:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: 'BUYER' })
  role: string;
}

// PATCH /users/:id
export class PatchUserDto {
  @ApiPropertyOptional({ example: 'john_doe' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone_number?: string;
}

// PUT /users/:id
export class PutUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone_number: string;

  @ApiProperty({ minLength: 8, maxLength: 128 })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
