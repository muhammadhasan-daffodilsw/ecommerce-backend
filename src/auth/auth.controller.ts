import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import {
  LoginDto,
  AuthResponseDto,
  SignupDto,
  RefreshTokenDto,
} from './dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDto): AuthResponseDto {
    return this.authService.login(data);
  }

  @Post('signup')
  signup(@Body() data: SignupDto): AuthResponseDto {
    return this.authService.signup(data);
  }

  @Post('refresh')
  refresh(@Body() data: RefreshTokenDto): AuthResponseDto {
    return this.authService.refresh(data);
  }
}
