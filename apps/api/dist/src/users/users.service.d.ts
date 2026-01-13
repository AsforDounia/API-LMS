import { Model } from 'mongoose';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { User } from '@users/entities/user.entity';
import { EmailService } from '@email/email.service';
import { type ObjectId } from '@common/types/objectid.type';
export declare class UsersService {
    private userModel;
    private readonly emailService;
    constructor(userModel: Model<User>, emailService: EmailService);
    private generateRandomPassword;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): string;
    findOne(id: ObjectId): string;
    update(id: ObjectId, updateUserDto: UpdateUserDto, currentUser: User): Promise<User>;
    remove(id: ObjectId, currentUser: User): Promise<User>;
}
