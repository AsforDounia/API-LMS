import { IsMongoId, IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitAnswerDto {
  @IsMongoId()
  questionId: string;

  @IsArray()
  @IsString({ each: true })
  selectedAnswers: string[];
}

export class SubmitQuizDto {
  @IsMongoId()
  attemptId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  answers: SubmitAnswerDto[];
}
