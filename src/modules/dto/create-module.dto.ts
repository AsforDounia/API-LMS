import { Types } from 'mongoose';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateModuleDto {
  @IsArray()
  @IsNotEmpty()
  coursesIds!: Types.ObjectId[];

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  order!: number;

  @IsString()
  @IsNotEmpty()
  moduleType!: string;

  @IsBoolean()
  isPublished?: boolean;
}
