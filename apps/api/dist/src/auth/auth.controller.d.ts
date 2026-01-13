import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    logout(authHeader: string, user: User): Promise<{
        message: string;
    }>;
    getProfile(user: User): {
        email: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
        role: import("../common/enums/role.enum").Role;
    };
}
