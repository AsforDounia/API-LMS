import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
// import { RolesGuard } from './roles.guard';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

//   @UseGuards(RolesGuard)
  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

//   @UseGuards(RolesGuard)
  @Post(':quizId/questions')
  async addQuestion(
    @Param('quizId') quizId: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.quizService.addQuestion({ ...createQuestionDto, quizId });
  }

//   @Get(':id')
//   async getQuizById(@Param('id') id: string) {
//     return this.quizService.getQuizById(id);
//   }

  @Get(':quizId/questions')
  async getQuestionsByQuiz(@Param('quizId') quizId: string) {
    return this.quizService.getQuestionsByQuiz(quizId);
  }
}
