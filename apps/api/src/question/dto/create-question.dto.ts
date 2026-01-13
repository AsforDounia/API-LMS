import { IsMongoId, IsString, IsArray, IsInt, IsEnum } from 'class-validator';
import { QuestionType } from '../schema/question.schema';

export class CreateQuestionDto {
  @IsMongoId()
  quizId: string;

  @IsString()
  questionText: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsInt()
  points: number;

}
