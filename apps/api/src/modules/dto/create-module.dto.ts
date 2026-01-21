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
  @IsMongoId({ each: true })
  course!: Types.ObjectId;

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
