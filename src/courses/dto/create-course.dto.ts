
import {  IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;

}
