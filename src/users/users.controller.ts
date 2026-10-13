import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  ParseUUIDPipe,
  Request,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import {
  ApiProperty,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  UserResponseDto,
  UserMeResponseDto,
  PutUserDto,
  PatchUserDto,
} from './dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

ApiTags('Users');
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserMeResponseDto })
  @ApiBearerAuth()
  async getMe(@Request() req: any): Promise<UserMeResponseDto> {
    return await this.userService.getMe(req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: 4 })) id: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserByID(id);
  }
}
