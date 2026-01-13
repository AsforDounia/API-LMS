import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { Question, QuestionSchema } from '../question/schema/question.schema';
// import { RolesGuard } from './roles.guard';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Quiz.name, schema: QuizSchema },
			{ name: Question.name, schema: QuestionSchema },
		]),
	],
	controllers: [QuizController],
	providers: [QuizService
        // RolesGuard
    ],
	exports: [QuizService],
})
export class QuizModule {}
