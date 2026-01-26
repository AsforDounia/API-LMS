'use client'

import { useState, useCallback } from 'react'
import { Question } from '@/types/quiz.types'
import QuestionForm from './QuestionForm'
import QuizProgress from './QuizProgress'
import { ChevronLeft, ChevronRight, Send } from 'lucide-react'

interface QuizFormProps {
  questions: Question[]
  attemptId: string
  onSubmit: (answers: { [questionId: string]: number[] }) => Promise<void>
}

export default function QuizForm({
  questions,
  attemptId,
  onSubmit,
}: QuizFormProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [questionId: string]: number[] }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = questions[currentIndex]
  const isAnswered = currentQuestion && (answers[currentQuestion._id]?.length ?? 0) > 0

  const handleAnswerChange = useCallback(
    (questionId: string, selectedAnswers: number[]) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: selectedAnswers,
      }))
      setError(null)
    },
    []
  )

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      setError(null)
      setIsSubmitting(true)

      const unansweredCount = questions.filter(
        (q) => (answers[q._id]?.length ?? 0) === 0
      ).length

      if (unansweredCount > 0) {
        setError(
          `${unansweredCount} question(s) non répondue(s). Voulez-vous continuer?`
        )
        // Vous pouvez ajouter une confirmation ici
      }

      await onSubmit(answers)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur lors de la soumission'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const allAnswered = questions.every(
    (q) => (answers[q._id]?.length ?? 0) > 0
  )

  return (
    <div className="space-y-6">
      {/* Progress */}
      <QuizProgress current={currentIndex + 1} total={questions.length} />

      {/* Question */}
      {currentQuestion && (
        <QuestionForm
          question={currentQuestion}
          onSubmit={async (selectedAnswers: number[]) =>
            handleAnswerChange(currentQuestion._id, selectedAnswers)
          }
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 bg-gray-50 p-4 rounded-lg">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Précédent
        </button>

        <div className="text-sm font-semibold text-gray-600">
          Question {currentIndex + 1} / {questions.length}
        </div>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Suivant
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Soumission...' : 'Soumettre le quiz'}
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <div className="text-sm text-gray-700">
          <p className="font-semibold">Résumé:</p>
          <p className="mt-1">
            Questions répondues: <span className="font-bold text-blue-600">{Object.keys(answers).length}</span> / {questions.length}
          </p>
        </div>
      </div>
    </div>
  )
}
