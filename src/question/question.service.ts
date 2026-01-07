import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schema/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Quiz } from '../quiz/schemas/quiz.schema';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
     @InjectModel(Quiz.name)
  private readonly quizModel: Model<Quiz>,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
  const quizExists = await this.quizModel.exists({
    _id: createQuestionDto.quizId,
  });

  if (!quizExists) {
    throw new BadRequestException('Quiz does not exist');
  }

  const question = new this.questionModel(createQuestionDto);
  return question.save();
}

  async getQuestionsByQuiz(quizId: string): Promise<Question[]> {
    return this.questionModel.find({ quizId }).exec();
  }

  async getQuestionById(id: string): Promise<Question | null> {
    return this.questionModel.findById(id).exec();
  }

  async updateQuestion(id: string, updateDto: Partial<CreateQuestionDto>): Promise<Question | null> {
    return this.questionModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async deleteQuestion(id: string): Promise<Question | null> {
    return this.questionModel.findByIdAndDelete(id).exec();
  }
}
