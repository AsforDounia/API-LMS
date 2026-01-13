import { IsMongoId, IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateQuizDto {
  @IsMongoId()
  moduleId: string;

  @IsString()
  title: string;

  @IsInt()
  passingScore: number;

  @IsBoolean()
  isRequired: boolean;
}
