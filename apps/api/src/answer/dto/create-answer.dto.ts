import { IsMongoId, IsArray, IsInt ,ArrayNotEmpty} from 'class-validator';

export class CreateAnswerDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  selectedAnswers: number[];

  @IsMongoId()
  attemptId: string;

  @IsMongoId()
  questionId: string;
}
