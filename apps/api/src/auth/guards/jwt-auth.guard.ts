import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Access token is required. Please log in to access this resource.');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header format. Use "Bearer <token>" format.');
    }

    const token = authHeader.substring(7);
    if (!token || token.trim() === '') {
      throw new UnauthorizedException('Access token is required. Please log in to access this resource.');
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (user && !err) {
      return user;
    }

    switch (info?.name) {
      case 'TokenExpiredError':
        throw new UnauthorizedException('Access token has expired. Please log in again.');
      case 'NotBeforeError':
        throw new UnauthorizedException('Access token is not yet valid. Please wait and try again.');
      case 'JsonWebTokenError':
        const msg = info.message.toLowerCase();
        if (msg.includes('invalid signature')) {
          throw new UnauthorizedException('Access token has an invalid signature. Please log in again.');
        }
        if (msg.includes('malformed') || msg.includes('invalid token')) {
          throw new UnauthorizedException('Access token is malformed. Please provide a valid token.');
        }
        if (msg.includes('audience')) {
          throw new UnauthorizedException('Access token has invalid audience. Please log in again.');
        }
        if (msg.includes('issuer')) {
          throw new UnauthorizedException('Access token has invalid issuer. Please log in again.');
        }
        throw new UnauthorizedException('Invalid access token. Please provide a valid token.');
      default:
        if (err) throw err;
        throw new UnauthorizedException('Access token is required. Please log in to access this resource.');
    }
  }
}