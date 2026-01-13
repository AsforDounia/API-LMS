import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from '@users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@common/enums/role.enum';
import { BCRYPT_ROUNDS } from '@common/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User): string {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async register(registerDto: RegisterDto): Promise<{ message: string; user: Partial<User>; accessToken: string }> {
    const existingUser = await this.userModel.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
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
}