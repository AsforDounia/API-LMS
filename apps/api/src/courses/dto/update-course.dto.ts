import { IsString, IsOptional, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    @MinLength(3, { message: 'Title must be at least 3 characters' })
    @MaxLength(100, { message: 'Title must be at most 100 characters' })
    title?: string;

    @IsString()
    @IsOptional()
    @MaxLength(2000, { message: 'Description must be at most 2000 characters' })
    description?: string;

    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;
}

