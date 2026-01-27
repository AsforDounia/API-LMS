import api from './api';

export interface Quiz {
  _id: string;
  moduleId: string | {
    _id: string;
    title: string;
  };
  title: string;
  passingScore: number;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Question {
  _id: string;
  quizId: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  points?: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  passed: boolean;
  answers: Record<string, number>;
  completedAt: string;
}

export const quizApi = {
  getQuizzesByModule: async (moduleId: string): Promise<Quiz[]> => {
    console.log("id de module", moduleId);
    
    const response = await api.get(`/quizzes/${moduleId}/quizzes`);
    console.log("response quizzes", response.data);
    return response.data;
  },

  getQuizById: async (quizId: string): Promise<Quiz> => {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  },

  getQuestionsByQuiz: async (quizId: string): Promise<Question[]> => {
    const response = await api.get(`/quizzes/${quizId}/questions`);
    return response.data;
  },

  submitQuiz: async (quizId: string, answers: Record<string, number>): Promise<QuizResult> => {
    const response = await api.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data;
  }
};