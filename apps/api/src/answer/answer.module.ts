import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './schema/answer.schema';
import {
  QuizAttempt,
  QuizAttemptSchema,
} from '../quizAttempt/schema/quizAttempt.schema';
import { Question, QuestionSchema } from '../question/schema/question.schema';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Quiz, QuizSchema } from '../quiz/schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Quiz.name, schema: QuizSchema },
    ]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
