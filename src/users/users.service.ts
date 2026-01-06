import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { User } from '@users/entities/user.entity';
import { Role } from '@common/enums/role.enum';
import { EmailService } from '@email/email.service';
import { type ObjectId } from '@common/types/objectid.type';
import { PASSWORD_LENGTH, BCRYPT_ROUNDS, PASSWORD_CHARS } from '@common/constants';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly emailService: EmailService,
    ) {}
    private generateRandomPassword(length = PASSWORD_LENGTH): string {
        let password = '';
        for (let i = 0; i < length; i++) {
            password += PASSWORD_CHARS.charAt(Math.floor(Math.random() * PASSWORD_CHARS.length));
        }
        return password;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const generatedPassword = this.generateRandomPassword();
        const hashedPassword = await bcrypt.hash(generatedPassword, BCRYPT_ROUNDS);

        const user = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            role: createUserDto.role || Role.STUDENT,
        });

        // Send password to user's email
        await this.emailService.sendUserPassword(user.email, generatedPassword);

        return user.save();
    }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: ObjectId) {
    return `This action returns a #${id} user`;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({ email: updateUserDto.email });
      
      // If a user was found AND it's not the user we are currently updating
      if (existingUser && existingUser._id !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        BCRYPT_ROUNDS
      );
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    return updatedUser;
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} user`;
  }
}



