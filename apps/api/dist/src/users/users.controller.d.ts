import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { type ObjectId } from '@common/types/objectid.type';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): string;
    findOne(id: ObjectId): string;
    update(id: ObjectId, updateUserDto: UpdateUserDto, currentUser: User): Promise<User>;
    remove(id: ObjectId, currentUser: User): Promise<User>;
}
