import { IsMongoId, IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitAnswerDto {
  @IsMongoId()
  questionId: string;

  @IsArray()
  @IsInt({ each: true })
  selectedAnswers: number[];
}

export class SubmitQuizDto {
  @IsMongoId()
  attemptId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  answers: SubmitAnswerDto[];
}
