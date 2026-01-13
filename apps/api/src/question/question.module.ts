import {Module} from '@nestjs/common';
import {QuestionService} from './question.service';
import {QuestionController} from './question.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Question, QuestionSchema} from './schema/question.schema';
import {Quiz, QuizSchema} from '../quiz/schemas/quiz.schema';
@Module({
    imports: [MongooseModule.forFeature([{name: Question.name, schema: QuestionSchema},{ name: Quiz.name, schema: QuizSchema },]),],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule {}