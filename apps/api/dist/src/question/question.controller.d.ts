import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<import("./schema/question.schema").Question>;
    getQuestionsByQuiz(quizId: string): Promise<import("./schema/question.schema").Question[]>;
    getQuestionById(id: string): Promise<import("./schema/question.schema").Question>;
    updateQuestion(id: string, updateDto: Partial<CreateQuestionDto>): Promise<import("./schema/question.schema").Question>;
    deleteQuestion(id: string): Promise<{
        message: string;
    }>;
}
