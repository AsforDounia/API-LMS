import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizAttempt, QuizAttemptSchema } from './schema/quizAttempt.schema';
import { QuizAttemptService } from './quizAttempt.service';
import { QuizAttemptController } from './quizAttempt.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizAttempt.name, schema: QuizAttemptSchema },
    ]),
  ],
  controllers: [QuizAttemptController],
  providers: [QuizAttemptService],
  exports: [QuizAttemptService],
})
export class QuizAttemptModule {}