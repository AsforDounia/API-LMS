import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @Get('attempt/:attemptId')
  async getAnswersByAttempt(@Param('attemptId') attemptId: string) {
    return this.answerService.getAnswersByAttempt(attemptId);
  }

  @Post('submit-quiz')
  async submitQuiz(@Body() submitQuizDto: SubmitQuizDto) {
    return this.answerService.submitQuiz(submitQuizDto);
  }
}
