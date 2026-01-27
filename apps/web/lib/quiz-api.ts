import api from "./api"
import {
  Quiz,
  Question,
  QuizAttempt,
  Answer,
 
} from "@/types/quiz.types"

// ========== QUIZ APIs ==========
export const quizApi = {
  // Get all quizzes
  getAll: async (): Promise<Quiz[]> => {  console.log("response");
    const response = await api.get("/quizzes");
  
    return response.data;
  },

  // Get quiz by ID
  getById: async (id: string): Promise<Quiz> => {
    const response = await api.get(`/quizzes/${id}`)
    return response.data
  },

  // Get quizzes by module
  getByModule: async (moduleId: string): Promise<Quiz[]> => {
    const response = await api.get(`/quizzes/module/${moduleId}`)
    return response.data
  },

  // Create quiz (Teacher/Admin only)
  create: async (data: Partial<Quiz>): Promise<Quiz> => {
    const response = await api.post("/quizzes", data)
    return response.data
  },

  // Update quiz (Teacher/Admin only)
  update: async (id: string, data: Partial<Quiz>): Promise<Quiz> => {
    const response = await api.patch(`/quizzes/${id}`, data)
    return response.data
  },

  // Delete quiz (Teacher/Admin only)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/quizzes/${id}`)
  },

  // Get questions for a quiz
  getQuestions: async (quizId: string): Promise<Question[]> => {
    const response = await api.get(`/quizzes/${quizId}/questions`)
    return response.data
  },
}

// ========== QUIZ ATTEMPT APIs ==========
export const quizAttemptApi = {
  // Start a new quiz attempt
  create: async (data: {
    quizId: string
    apprenantId: string
  }): Promise<QuizAttempt> => {
    const response = await api.post("/quiz-attempts", data)
    return response.data
  },

  // Get attempt by ID
  getById: async (attemptId: string): Promise<QuizAttempt> => {
    const response = await api.get(`/quiz-attempts/${attemptId}`)
    return response.data
  },

  // Get all attempts by user
  getByUser: async (userId: string): Promise<QuizAttempt[]> => {
    const response = await api.get(`/quiz-attempts/user/${userId}`)
    return response.data
  },

  // Get all attempts for a quiz
  getByQuiz: async (quizId: string): Promise<QuizAttempt[]> => {
    const response = await api.get(`/quiz-attempts/quiz/${quizId}`)
    return response.data
  },

  // Finalize attempt and calculate score
  finalize: async (attemptId: string): Promise<QuizAttempt> => {
    const response = await api.post(`/quiz-attempts/${attemptId}/finalize`)
    return response.data
  },

  // Get quiz results
  getResults: async (attemptId: string) => {
    const response = await api.get(`/quiz-attempts/${attemptId}/results`)
    return response.data
  },
}

// ========== ANSWER APIs ==========
export const answerApi = {
  // Submit a single answer
  submitAnswer: async (data: {
    attemptId: string
    questionId: string
    selectedAnswers: number[]
  }): Promise<Answer> => {
    const response = await api.post("/answers", data)
    return response.data
  },

  // Get answers for an attempt
  getByAttempt: async (attemptId: string): Promise<Answer[]> => {
    const response = await api.get(`/answers/attempt/${attemptId}`)
    return response.data
  },

  // Submit all answers at once
  submitQuiz: async (data) => {
    const response = await api.post("/answers/submit", data)
    return response.data
  },
}
