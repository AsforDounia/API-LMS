import { IsMongoId, IsDateString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateQuizAttemptDto {

  @IsMongoId()
  apprenantId: string;

  @IsMongoId()
  quizId: string;
}