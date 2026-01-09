import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // @IsString()
    // @IsNotEmpty()
    // @MinLength(6)
    // password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
