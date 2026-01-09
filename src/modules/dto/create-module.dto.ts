import { Types } from 'mongoose';
import {
    ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateModuleDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsMongoId({ each: true })
  courses!: Types.ObjectId[];

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
