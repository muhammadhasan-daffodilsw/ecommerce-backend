import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards , Request} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

import {
  LoginDto,
  AuthResponseDto,
  SignupDto,
  RefreshTokenDto,
  InfoDto,
} from './dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

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
  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfoDto })
  async logout(@Request() req :any ,@Body() data: RefreshTokenDto): Promise<InfoDto> {
    return await this.authService.logout(req.user.id, data);
  }

  @Post('logoutAll')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfoDto })
  async logoutAll(@Request() req :any): Promise<InfoDto> {
    return await this.authService.logoutAll(req.user.id);
  }

}
