import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizAttempt } from './schema/quizAttempt.schema';
import { CreateQuizAttemptDto } from './dto/quizAttempt.dto';
import { User } from '../users/entities/user.entity';
import { Quiz } from '../quiz/schemas/quiz.schema';
import { Answer } from '../answer/schema/answer.schema';
import { Question } from '../question/schema/question.schema';

@Injectable()
export class QuizAttemptService {
  constructor(
    @InjectModel(QuizAttempt.name) private readonly quizAttemptModel: Model<QuizAttempt>,
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}

  async create(createQuizAttemptDto: CreateQuizAttemptDto): Promise<QuizAttempt> {
    // Vérification de l'existence du quiz
    const quiz = await this.quizModel.findById(createQuizAttemptDto.quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz non trouvé');
    }
    // Vérification de l'existence de l'utilisateur
    const user = await this.userModel.findById(createQuizAttemptDto.apprenantId);
    if (!user) {
      throw new NotFoundException('Apprenant non trouvé');
    }
    const attempt = new this.quizAttemptModel(createQuizAttemptDto);
    return attempt.save();
  }

  async finalizeAttempt(attemptId: string): Promise<QuizAttempt> {
    // Récupérer toutes les réponses de cette tentative
    const answers = await this.answerModel.find({ attemptId }).exec();

    // Récupérer toutes les questions concernées
    const questionIds = answers.map(ans => ans.questionId);
    const questions = await this.questionModel.find({ _id: { $in: questionIds } }).exec();

    // Créer une map questionId -> points
    const pointsMap = new Map<string, number>();
    questions.forEach(q => pointsMap.set(q._id.toString(), q.points));

    // Calculer le score total
    const score = answers.reduce((sum, ans) => sum + (ans.pointsEarned || 0), 0);
    const totalPossiblePoints = answers.reduce(
      (sum, ans) => sum + (pointsMap.get(ans.questionId.toString()) || 0),
      0,
    );
    const percent = totalPossiblePoints > 0 ? (score / totalPossiblePoints) * 100 : 0;

    // Récupérer la tentative
    const attempt = await this.quizAttemptModel.findById(attemptId);
    if (!attempt) throw new NotFoundException('QuizAttempt not found');

    // Récupérer le quiz pour le seuil de réussite
    const quiz = await this.quizModel.findById(attempt.quizId);
    if (!quiz) throw new NotFoundException('Quiz not found');

    // Déterminer si la tentative est réussie
    const passed = score >= quiz.passingScore;

    // Mettre à jour la tentative
    attempt.score = score;
    attempt.passed = passed;
    attempt.completedAt = new Date();
    await attempt.save();
    return attempt;
  }

  async getAttemptsByQuiz(quizId: string): Promise<QuizAttempt[]> {
    return this.quizAttemptModel.find({ quizId }).exec();
  }
}