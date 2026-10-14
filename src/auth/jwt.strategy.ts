import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service.js';

interface JwtPayload {
  sub: string;
  access_jti: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload.access_jti);
    if (!payload.sub || !payload.access_jti) {
      throw new UnauthorizedException('Invalid access token');
    }
    const user = await this.usersService.getAuthUserById(payload.sub);

    console.log(user);

    return {
      ...user,
      jti: payload.access_jti,
    };
  }
}
