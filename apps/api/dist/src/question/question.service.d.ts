import { Model } from 'mongoose';
import { Question } from './schema/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Quiz } from '../quiz/schemas/quiz.schema';
export declare class QuestionService {
    private readonly questionModel;
    private readonly quizModel;
    constructor(questionModel: Model<Question>, quizModel: Model<Quiz>);
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question>;
    getQuestionsByQuiz(quizId: string): Promise<Question[]>;
    getQuestionById(id: string): Promise<Question | null>;
    updateQuestion(id: string, updateDto: Partial<CreateQuestionDto>): Promise<Question | null>;
    deleteQuestion(id: string): Promise<Question | null>;
}
