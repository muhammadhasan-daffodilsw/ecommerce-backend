import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  isString,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ minLength: 8, maxLength: 128 })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  username: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  @Matches(/^(?:\+91|91|0)?[6-9]\d{9}$|^(?:\+91|91|0)?[6-9]\d{4}[-\s]?\d{5}$/, {
    message: 'Please enter a valid 10-digit Indian mobile number',
  })
  phone_number: string;

  @ApiProperty({ minLength: 8, maxLength: 128 })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: '+919876543210' })
  @IsString()
  @Matches(/^(?:\+91|91|0)?[6-9]\d{9}$|^(?:\+91|91|0)?[6-9]\d{4}[-\s]?\d{5}$/, {
    message: 'Please enter a valid 10-digit Indian mobile number',
  })
  phone_number: string;

  @ApiProperty({ maxLength: 128 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ example: 900 })
  access_token_ttl: number;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty({ example: 604800 })
  refresh_token_ttl: number;
}

export class InfoDto {
  @ApiProperty()
  message: string;
}
