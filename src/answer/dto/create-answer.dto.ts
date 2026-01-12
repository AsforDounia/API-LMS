import { IsMongoId, IsArray, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsArray()
  @IsString({ each: true })
  selectedAnswers: string[];

  @IsMongoId()
  attemptId: string;

  @IsMongoId()
  questionId: string;
}
