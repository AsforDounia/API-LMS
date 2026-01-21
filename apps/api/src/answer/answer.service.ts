import { SubmitQuizDto, SubmitAnswerDto } from './dto/submit-quiz.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from './schema/answer.schema';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { QuizAttempt } from '../quizAttempt/schema/quizAttempt.schema';
import { Question } from '../question/schema/question.schema';
import { Quiz } from '../quiz/schemas/quiz.schema';
// import { Module as ModuleEntity } from '../quiz/schemas/module.schema';
// import { ModuleProgress } from '../common/entities/module-progress.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
    @InjectModel(QuizAttempt.name)
    private readonly quizAttemptModel: Model<QuizAttempt>,
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    // @InjectModel(ModuleEntity.name) private readonly moduleModel: Model<ModuleEntity>,
    // @InjectModel(ModuleProgress.name) private readonly moduleProgressModel: Model<ModuleProgress>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    // Vérifier que la tentative existe
    const attempt = await this.quizAttemptModel.findById(
      createAnswerDto.attemptId,
    );
    if (!attempt) throw new NotFoundException('QuizAttempt not found');
    // Vérifier que la question existe
    const question = await this.questionModel.findById(
      createAnswerDto.questionId,
    );
    if (!question) throw new NotFoundException('Question not found');
    // Vérifier si la question a déjà été répondue
    const alreadyAnswered = await this.answerModel.findOne({
      attemptId: createAnswerDto.attemptId,
      questionId: createAnswerDto.questionId,
    });
    if (alreadyAnswered) {
      throw new BadRequestException(
        'You have already answered this question in this attempt.',
      );
    }
    // Vérification de la progression (verrouillage séquentiel)
    // Récupérer le quiz et le module associé
    const quiz = await this.quizModel
      .findById(attempt.quizId)
      .populate('moduleId');
    if (!quiz) throw new NotFoundException('Quiz not found');
    const module = quiz.moduleId;
    // Récupérer tous les modules du même cours, triés par ordre
    // const allModules = await this.moduleModel.find({ courseId: module.courseId }).sort({ order: 1 }).exec();
    // Vérifier la progression de l'utilisateur
    // for (const m of allModules) {
    //   if (m.order < module.order) {
    //     // Vérifier si l'utilisateur a validé ce module (ex: via une collection ModuleProgress ou QuizAttempt)
    //     // Ici, on suppose que la progression est tracée dans QuizAttempt avec passed=true
    //     const previousAttempt = await this.quizAttemptModel.findOne({
    //       apprenantId: attempt.apprenantId,
    //       quizId: m.quizId,
    //       passed: true,
    //     });
    //     if (!previousAttempt) {
    //       throw new ForbiddenException('Module précédent non validé, accès refusé.');
    //     }
    //   }
    // }
    // Correction automatique
    const isCorrect =
      question.correctAnswers.length ===
        createAnswerDto.selectedAnswers.length &&
      question.correctAnswers.every((ans) =>
        createAnswerDto.selectedAnswers.includes(ans),
      );
    const pointsEarned = isCorrect ? question.points : 0;
    const answer = new this.answerModel({
      ...createAnswerDto,
      isCorrect,
      pointsEarned,
    });
    return answer.save();
  }

  async getAnswersByAttempt(attemptId: string): Promise<Answer[]> {
    return this.answerModel.find({ attemptId }).exec();
  }

  async submitQuiz(submitQuizDto: SubmitQuizDto): Promise<{
    success: boolean;
    message: string;
    results: { questionId: string; status: string; error?: any }[];
  }> {
    const { attemptId, answers } = submitQuizDto;
    const results: { questionId: string; status: string; error?: any }[] = [];
    for (const answerDto of answers) {
      try {
        await this.create({
          attemptId,
          questionId: answerDto.questionId,
          selectedAnswers: answerDto.selectedAnswers,
        });
        results.push({ questionId: answerDto.questionId, status: 'success' });
      } catch (e) {
        results.push({
          questionId: answerDto.questionId,
          status: 'error',
          error: e.message,
        });
      }
    }
    return {
      success: true,
      message: 'Quiz submitted',
      results,
    };
  }
}
