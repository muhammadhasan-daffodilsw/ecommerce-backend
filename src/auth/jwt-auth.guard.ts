import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token has expired');
    }

    // 2. Handle generic unauthorized or other passport errors
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid access token');
    }

    return user;
  }
}
