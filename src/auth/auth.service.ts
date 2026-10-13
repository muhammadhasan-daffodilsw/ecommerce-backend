import { Injectable } from '@nestjs/common';
import {
  LoginDto,
  AuthResponseDto,
  SignupDto,
  RefreshTokenDto,
} from './dto.js';
import { AuthRepository } from './auth.repo.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository,
    private readonly usersService : UsersService
  ) {}
  login(data: LoginDto): AuthResponseDto {
    return new AuthResponseDto();
  }

  signup(data: SignupDto): AuthResponseDto {
    return new AuthResponseDto();
  }

  refresh(data: RefreshTokenDto): AuthResponseDto {
    return new AuthResponseDto();
  }

  revoke_session() {}

  issue_tokens() {}
}
