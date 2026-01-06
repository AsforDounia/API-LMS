import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
