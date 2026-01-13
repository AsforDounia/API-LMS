import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '@users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenBlacklistService } from './token-blacklist.service';
export declare class AuthService {
    private userModel;
    private jwtService;
    private tokenBlacklistService;
    constructor(userModel: Model<User>, jwtService: JwtService, tokenBlacklistService: TokenBlacklistService);
    private generateToken;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        accessToken: string;
        user: Partial<User>;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        accessToken: string;
        user: Partial<User>;
    }>;
    logout(token: string, user: User): Promise<{
        message: string;
    }>;
}
