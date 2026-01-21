import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizAttempt, QuizAttemptSchema } from './schema/quizAttempt.schema';
import { User, UserSchema } from '../users/entities/user.entity';
import { Quiz, QuizSchema } from '../quiz/schemas/quiz.schema';
import { Answer, AnswerSchema } from '../answer/schema/answer.schema';
import { Question, QuestionSchema } from '../question/schema/question.schema';
import { QuizAttemptService } from './quizAttempt.service';
import { QuizAttemptController } from './quizAttempt.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
      { name: User.name, schema: UserSchema },
      { name: Quiz.name, schema: QuizSchema },
      { name: Answer.name, schema: AnswerSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuizAttemptController],
  providers: [QuizAttemptService],
  exports: [QuizAttemptService],
})
export class QuizAttemptModule {}
