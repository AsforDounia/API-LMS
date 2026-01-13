import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Get('quiz/:quizId')
  async getQuestionsByQuiz(@Param('quizId') quizId: string) {
    return this.questionService.getQuestionsByQuiz(quizId);
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    const question = await this.questionService.getQuestionById(id);
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  @Put(':id')
  async updateQuestion(@Param('id') id: string, @Body() updateDto: Partial<CreateQuestionDto>) {
    const updated = await this.questionService.updateQuestion(id, updateDto);
    if (!updated) throw new NotFoundException('Question not found');
    return updated;
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    const deleted = await this.questionService.deleteQuestion(id);
    if (!deleted) throw new NotFoundException('Question not found');
    return { message: 'Question deleted' };
  }
}
