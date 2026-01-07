import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('Access token has expired. Please log in again.');
      } else if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid access token. Please provide a valid token.');
      } else if (err) {
        throw err;
      } else {
        throw new UnauthorizedException('Access token is required. Please log in to access this resource.');
      }
    }
    return user;
  }
}