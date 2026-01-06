import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../common/enums/role.enum';
import { EmailService } from '../email/email.service';
import { PASSWORD_LENGTH, BCRYPT_ROUNDS, PASSWORD_CHARS } from '../common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly emailService: EmailService,
  ) { }

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
      role: createUserDto.role || Role.LEARNER,
    });

    const savedUser = await user.save();

    // Send password to user's email
    await this.emailService.sendUserPassword(savedUser.email, generatedPassword);

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({ email: updateUserDto.email });
      if (existingUser && existingUser._id.toString() !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, BCRYPT_ROUNDS);
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

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    ).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    return deletedUser;
  }
}
