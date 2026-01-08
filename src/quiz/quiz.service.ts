import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './schemas/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Question } from '../question/schema/question.schema';
import { CreateQuestionDto } from '../question/dto/create-question.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) 
    private readonly quizModel: Model<Quiz>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = new this.quizModel(createQuizDto);
    return quiz.save();
  }

  async addQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = new this.questionModel(createQuestionDto);
    return question.save();
  }

//   async getQuizById(id: string): Promise<Quiz> {
//     return this.quizModel.findById(id).populate('moduleId').exec();
//   }

  async getQuestionsByQuiz(quizId: string): Promise<Question[]> {
    return this.questionModel.find({ quizId }).exec();
  }

}
