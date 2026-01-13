"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Access token is required. Please log in to access this resource.');
        }
        if (!authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Invalid authorization header format. Use "Bearer <token>" format.');
        }
        const token = authHeader.substring(7);
        if (!token || token.trim() === '') {
            throw new common_1.UnauthorizedException('Access token is required. Please log in to access this resource.');
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (user && !err) {
            return user;
        }
        switch (info?.name) {
            case 'TokenExpiredError':
                throw new common_1.UnauthorizedException('Access token has expired. Please log in again.');
            case 'NotBeforeError':
                throw new common_1.UnauthorizedException('Access token is not yet valid. Please wait and try again.');
            case 'JsonWebTokenError':
                const msg = info.message.toLowerCase();
                if (msg.includes('invalid signature')) {
                    throw new common_1.UnauthorizedException('Access token has an invalid signature. Please log in again.');
                }
                if (msg.includes('malformed') || msg.includes('invalid token')) {
                    throw new common_1.UnauthorizedException('Access token is malformed. Please provide a valid token.');
                }
                if (msg.includes('audience')) {
                    throw new common_1.UnauthorizedException('Access token has invalid audience. Please log in again.');
                }
                if (msg.includes('issuer')) {
                    throw new common_1.UnauthorizedException('Access token has invalid issuer. Please log in again.');
                }
                throw new common_1.UnauthorizedException('Invalid access token. Please provide a valid token.');
            default:
                if (err)
                    throw err;
                throw new common_1.UnauthorizedException('Access token is required. Please log in to access this resource.');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map