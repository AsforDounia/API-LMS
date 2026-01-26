'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import QuizHeader from '@/components/quiz/QuizHeader'
import QuizTimer from '@/components/quiz/QuizTimer'
import QuizForm from '@/components/quiz/QuizForm'
import QuizResults from '@/components/quiz/QuizResults'
import {
  quizService,
} from '@/lib/quiz'
import { Quiz, Question, QuizResult } from '@/types/quiz.types'

type PageStatus = 'loading' | 'ready' | 'in-progress' | 'completed' | 'error'

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.quizId as string

  const [status, setStatus] = useState<PageStatus>('loading')
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load quiz data
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setStatus('loading')
        const [quizData, questionsData] = await Promise.all([
          quizService.getQuizById(quizId),
          quizService.getQuestionsByQuiz(quizId),
        ])

        setQuiz(quizData)
        setQuestions(questionsData)
        setStatus('ready')
      } catch (err) {
        console.error('Erreur:', err)
        setError('Impossible de charger le quiz')
        setStatus('error')
      }
    }

    loadQuizData()
  }, [quizId])

  // Start quiz attempt
  const handleStartQuiz = async () => {
    try {
      // Get apprenantId from localStorage or session
      const apprenantId = localStorage.getItem('apprenantId') || 'current-user'
      const attempt = await quizService.createAttempt(quizId, apprenantId)
      setAttemptId(attempt._id)
      setStatus('in-progress')
    } catch (err) {
      console.error('Erreur:', err)
      setError('Impossible de commencer le quiz')
    }
  }

  // Handle quiz submission
  const handleSubmitQuiz = async (
    answers: { [questionId: string]: number[] }
  ) => {
    if (!attemptId) return

    try {
      // Convert answers format
      const answersList = Object.entries(answers).map(([questionId, values]) => ({
        questionId,
        selectedAnswers: values,
      }))

      // Submit answers
      await quizService.submitAllAnswers(attemptId, answersList)

      // Get result (for now, just mark as completed)
      const attemptResult = await quizService.finalizeAttempt(attemptId)

      // Build result object
      const quizResult: QuizResult = {
        _id: attemptId,
        attemptId: attemptId,
        quizId: quizId,
        apprenantId: attemptResult.apprenantId,
        score: attemptResult.score,
        totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
        percentage: attemptResult.score,
        passed: attemptResult.passed,
        completedAt: new Date().toISOString(),
        answers: []
      }

      setResult(quizResult)
      setStatus('completed')
    } catch (err) {
      console.error('Erreur:', err)
      setError('Erreur lors de la soumission du quiz')
    }
  }

  // Handle time up
  const handleTimeUp = async () => {
    if (attemptId) {
      try {
        const attemptResult = await quizService.finalizeAttempt(attemptId)

        const quizResult: QuizResult = {
          _id: attemptId,
          attemptId: attemptId,
          quizId: quizId,
          apprenantId: attemptResult.apprenantId,
          score: attemptResult.score,
          totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
          percentage: attemptResult.score,
          passed: attemptResult.passed,
          completedAt: new Date().toISOString(),
          answers: []
        }
        setResult(quizResult)
        setStatus('completed')
      } catch (err) {
        console.error('Erreur:', err)
        setError('Erreur lors de la soumission du quiz')
      }
    }
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Chargement du quiz...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (status === 'error' || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded">
            <h2 className="text-xl font-bold text-red-700 mb-2">Erreur</h2>
            <p className="text-red-600">{error || 'Impossible de charger le quiz'}</p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Ready state - show quiz introduction
  if (status === 'ready') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <QuizHeader quiz={quiz} />

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Êtes-vous prêt?
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{questions.length} questions à répondre</span>
                </li>
                {quiz.duration && (
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Durée: {quiz.duration} minutes</span>
                  </li>
                )}
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Note minimale requise: {quiz.passingScore}%</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Vous pouvez naviguer entre les questions</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Commencer le quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  // In progress state
  if (status === 'in-progress' && attemptId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header with Timer */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-md">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
            </div>
            {quiz.duration && (
              <QuizTimer
                duration={quiz.duration}
                onTimeUp={handleTimeUp}
              />
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Quiz Form */}
          <QuizForm
            questions={questions}
            attemptId={attemptId}
            onSubmit={handleSubmitQuiz}
          />
        </div>
      </div>
    )
  }

  // Completed state
  if (status === 'completed' && result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <QuizResults
            result={result}
            quiz={quiz}
            questions={questions}
          />
        </div>
      </div>
    )
  }

  return null
}
