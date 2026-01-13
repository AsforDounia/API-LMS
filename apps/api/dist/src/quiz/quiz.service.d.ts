import { Model } from 'mongoose';
import { Quiz } from './schemas/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Question } from '../question/schema/question.schema';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
export declare class QuizService {
    private readonly quizModel;
    private readonly questionModel;
    constructor(quizModel: Model<Quiz>, questionModel: Model<Question>);
    createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz>;
    addQuestion(createQuestionDto: CreateQuestionDto): Promise<Question>;
    getQuestionsByQuiz(quizId: string): Promise<Question[]>;
}
