import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    createQuiz(createQuizDto: CreateQuizDto): Promise<import("./schemas/quiz.schema").Quiz>;
    addQuestion(quizId: string, createQuestionDto: CreateQuestionDto): Promise<import("../question/schema/question.schema").Question>;
    getQuestionsByQuiz(quizId: string): Promise<import("../question/schema/question.schema").Question[]>;
}
