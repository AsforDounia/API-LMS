import { Role } from '../../common/enums/role.enum';
export declare class CreateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
    role?: Role;
}
