import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizAttempt } from './schema/quizAttempt.schema';
import { CreateQuizAttemptDto } from './dto/create-quizAttempt.dto';

@Injectable()
export class QuizAttemptService {
  constructor(
    @InjectModel(QuizAttempt.name)
    private readonly quizAttemptModel: Model<QuizAttempt>,
  ) {}

  async create(createQuizAttemptDto: CreateQuizAttemptDto): Promise<QuizAttempt> {
    const attempt = new this.quizAttemptModel(createQuizAttemptDto);
    return attempt.save();
  }

  // Ajoute ici d'autres méthodes (find, update, etc.) selon besoin
}