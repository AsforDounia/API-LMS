import { IsMongoId, IsDateString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateQuizAttemptDto {
  @IsDateString()
  startedAt: Date;

  @IsOptional()
  @IsDateString()
  completedAt?: Date;

  @IsInt()
  score: number;

  @IsBoolean()
  passed: boolean;

  @IsInt()
  attemptNumber: number;

  @IsMongoId()
  apprenantId: string;

  @IsMongoId()
  quizId: string;
}