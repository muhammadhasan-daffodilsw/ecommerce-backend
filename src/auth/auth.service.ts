import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginDto,
  AuthResponseDto,
  SignupDto,
  RefreshTokenDto,
} from './dto.js';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repo.js';
import { UsersService } from '../users/users.service.js';
import { PhoneUtilsService } from '../common/phone-util/phone-util.service.js';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly usersService: UsersService,
    private readonly phoneUtilsService: PhoneUtilsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(data: LoginDto): Promise<AuthResponseDto> {
    const phoneNumber = this.phoneUtilsService.normalizeIndianNumber(
      data.phone_number,
    );

    const user = await this.usersService.getUserForAuthentication(phoneNumber);

    if (!user || !(await argon2.verify(user.password_hash, data.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user.id);
  }

  async signup(data: SignupDto): Promise<AuthResponseDto> {
    const phoneNumber = this.phoneUtilsService.normalizeIndianNumber(
      data.phone_number,
    );

    let user = await this.usersService.getUserForAuthentication(phoneNumber);
    if (user) throw new ConflictException('Account Already Exists');

    user = await this.usersService.createUser(
      phoneNumber,
      data.username,
      await argon2.hash(data.password),
    );
    return this.issueTokens(user.id);
  }

  async refresh(data: RefreshTokenDto): Promise<AuthResponseDto> {
    const refreshTokenHash = createHash('sha256')
      .update(data.refresh_token)
      .digest('hex');

    const session = await this.authRepo.findSessionByHash(refreshTokenHash);

    if (
      !session ||
      session.revoked_at !== null ||
      session.expires_at <= new Date()
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    await this.revokeSession(refreshTokenHash);
    return this.issueTokens(session.user_id);
  }

  async revokeSession(refreshTokenHash: string) {
    await this.authRepo.revokeSession(refreshTokenHash);
  }

  async issueTokens(id: string): Promise<AuthResponseDto> {
    const ACCESS_TOKEN_TTL = Number(
      this.configService.getOrThrow('ACCESS_TOKEN_TTL', 300),
    );
    const REFRESH_TOKEN_TTL = Number(
      this.configService.getOrThrow('REFRESH_TOKEN_TTL', 604800),
    );

    const access_jti = randomUUID();

    const refreshToken = randomBytes(32).toString('base64url');

    const refreshTokenHash = createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    await this.authRepo.createSession({
      user_id: id,
      refresh_token_hash: refreshTokenHash,
      expires_at: new Date(Date.now() + REFRESH_TOKEN_TTL * 1000),
      access_token_jti: access_jti,
    });

    const accessToken = await this.jwtService.signAsync({
      sub: id,
      access_jti,
    });

    return {
      access_token: accessToken,
      access_token_ttl: ACCESS_TOKEN_TTL,
      refresh_token: refreshToken,
      refresh_token_ttl: REFRESH_TOKEN_TTL,
    };
  }

  revokeAllSessions() {}
}
