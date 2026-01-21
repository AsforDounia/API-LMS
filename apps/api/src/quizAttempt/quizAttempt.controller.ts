import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { QuizAttemptService } from './quizAttempt.service';
import { CreateQuizAttemptDto } from './dto/quizAttempt.dto';

@Controller('quiz-attempts')
export class QuizAttemptController {
  constructor(private readonly quizAttemptService: QuizAttemptService) {}

  @Post()
  async create(@Body() createQuizAttemptDto: CreateQuizAttemptDto) {
    return this.quizAttemptService.create(createQuizAttemptDto);
  }

  @Get('/quiz/:quizId/attempts')
  async getAttemptsByQuiz(@Param('quizId') quizId: string) {
    return this.quizAttemptService.getAttemptsByQuiz(quizId);
  }
  @Get('/attempt/:attemptId')
  async getAttemptById(@Param('attemptId') attemptId: string) {
    return this.quizAttemptService.getAttemptById(attemptId);
  }

  @Post('/attempt/:attemptId/finalize')
  async finalizeAttempt(@Param('attemptId') attemptId: string) {
    return this.quizAttemptService.finalizeAttempt(attemptId);
  }
}
