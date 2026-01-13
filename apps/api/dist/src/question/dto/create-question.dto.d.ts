import { QuestionType } from '../schema/question.schema';
export declare class CreateQuestionDto {
    quizId: string;
    questionText: string;
    type: QuestionType;
    options: string[];
    points: number;
}
