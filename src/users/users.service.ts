import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../common/enums/role.enum';
// import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        // private readonly emailService: EmailService,
    ) {}

    private generateRandomPassword(length = 10): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const generatedPassword = this.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        const user = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            role: createUserDto.role || Role.STUDENT,
        });

        // Send password to user's email
        // await this.emailService.sendUserPassword(user.email, generatedPassword);

        return user.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email, isActive: true });
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id);
    }
}
