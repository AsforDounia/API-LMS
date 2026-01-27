'use client'

import { QuizResult, Question } from '@/types/quiz.types'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'

interface QuizResultsProps {
    result: QuizResult
    quiz: { title: string }
    questions: Question[]
}

export default function QuizResults({
    result,
    quiz,
    questions,
}: QuizResultsProps) {
    const isPassed = result.passed
    const scorePercentage = Math.round(result.percentage)

    const getScoreColor = () => {
        if (scorePercentage >= 80) return 'text-green-600'
        if (scorePercentage >= 60) return 'text-yellow-600'
        return 'text-red-600'
    }

    const getScoreBg = () => {
        if (scorePercentage >= 80) return 'bg-green-50'
        if (scorePercentage >= 60) return 'bg-yellow-50'
        return 'bg-red-50'
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div
                className={`rounded-lg shadow-lg p-8 text-center ${isPassed
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    }`}
            >
                <div className="flex justify-center mb-4">
                    {isPassed ? (
                        <CheckCircle className="w-20 h-20" />
                    ) : (
                        <XCircle className="w-20 h-20" />
                    )}
                </div>

                <h1 className="text-3xl font-bold mb-2">
                    {isPassed ? 'Bravo! Quiz réussi!' : 'Quiz non réussi'}
                </h1>
                <p className="text-lg opacity-90">{quiz.title}</p>
            </div>

            {/* Score */}
            <div className={`rounded-lg shadow-md p-8 ${getScoreBg()}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <p className="text-gray-600 text-sm font-semibold mb-2">Score</p>
                        <p className={`text-4xl font-bold ${getScoreColor()}`}>
                            {scorePercentage}%
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600 text-sm font-semibold mb-2">Points</p>
                        <p className={`text-4xl font-bold ${getScoreColor()}`}>
                            {result.score} / {result.totalPoints}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600 text-sm font-semibold mb-2">
                            Note de passage
                        </p>
                        <p className="text-2xl font-bold text-gray-700">60%</p>
                    </div>
                </div>
            </div>

            {/* Answers Review */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">
                        Révision des réponses
                    </h2>
                </div>

                <div className="divide-y">
                    {result.answers.map((answer: any, index: number) => {
                        const question = questions.find((q) => q._id === answer.questionId)
                        if (!question) return null

                        return (
                            <div key={answer._id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        {answer.isCorrect ? (
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-red-500" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Question {index + 1}: {question.text}
                                        </h3>

                                        <div className="space-y-2">
                                            {question.options && (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                                        Votre réponse:
                                                    </p>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {question.options
                                                            .filter((opt: any) =>
                                                                answer.selectedAnswers.includes(opt.id)
                                                            )
                                                            .map((opt: any) => (
                                                                <span
                                                                    key={opt.id}
                                                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                                >
                                                                    {opt.text}
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            )}

                                            <p className="text-sm">
                                                <span
                                                    className={`font-semibold ${answer.isCorrect
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                        }`}
                                                >
                                                    {answer.isCorrect
                                                        ? '✓ Correct'
                                                        : '✗ Incorrect'}
                                                </span>
                                                <span className="text-gray-600 ml-2">
                                                    {question.points} points
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">
                        Complété le{' '}
                        {new Date(result.completedAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                </div>

                <Link
                    href="/dashboard"
                    className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                    Retourner au tableau de bord
                </Link>
            </div>
        </div>
    )
}
