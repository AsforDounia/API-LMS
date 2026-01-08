import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from '@users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@common/enums/role.enum';
import { BCRYPT_ROUNDS } from '@common/constants';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  private generateToken(user: User): string {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async register(registerDto: RegisterDto): Promise<{ message: string; accessToken: string; user: Partial<User> }> {
    const existingUser = await this.userModel.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new ConflictException('An account with this email address already exists. Please use a different email or try logging in.');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, BCRYPT_ROUNDS);

    const user = new this.userModel({
      ...registerDto,
      password: hashedPassword,
      role: Role.STUDENT,
    });

    await user.save();

    const accessToken = this.generateToken(user);

    return {
      message: 'Registration successful',
      accessToken,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<{ message: string; accessToken: string; user: Partial<User> }> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password. Please check your credentials and try again.');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('This account has been deleted. Please contact support if you believe this is an error.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account has been deactivated. Please contact support to reactivate your account.');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password. Please check your credentials and try again.');
    }

    const accessToken = this.generateToken(user);

    return {
      message: 'Login successful',
      accessToken,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async logout(token: string, user: User): Promise<{ message: string }> {
    if (!token) {
      throw new UnauthorizedException('No token provided for logout.');
    }

    try {
      // Decode token to get expiration time
      const decoded = this.jwtService.decode(token) as any;
      const expiresAt = new Date(decoded.exp * 1000);

      // Blacklist the token
      await this.tokenBlacklistService.blacklistToken(token, expiresAt);

      return {
        message: 'Logout successful. Your session has been terminated.',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token provided for logout.');
    }
  }
}