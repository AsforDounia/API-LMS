import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  @MaxLength(50, { message: 'First name must be at most 50 characters' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(50, { message: 'Last name must be at most 50 characters' })
  lastName?: string;
}
