import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import {
  LoginDto,
  AuthResponseDto,
  SignupDto,
  RefreshTokenDto,
} from './dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseDto })
  async login(@Body() data: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.login(data);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: AuthResponseDto })
  async signup(@Body() data: SignupDto): Promise<AuthResponseDto> {
    return await this.authService.signup(data);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseDto })
  async refresh(@Body() data: RefreshTokenDto): Promise<AuthResponseDto> {
    return await this.authService.refresh(data);
  }
}
