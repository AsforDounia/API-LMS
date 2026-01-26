'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { quizService } from '@/lib/quiz'
import { Quiz } from '@/types/quiz.types'
import QuizCard from '@/components/quiz/QuizCard'

export default function QuizzesPage() {
    const router = useRouter()
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setIsLoading(true)
                const data = await quizService.getQuizzes()
                setQuizzes(data)
            } catch (err) {
                console.error('Erreur lors du chargement des quiz:', err)
                setError('Impossible de charger les quiz')
            } finally {
                setIsLoading(false)
            }
        }

        fetchQuizzes()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600">Chargement des quiz...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz</h1>
                    <p className="text-lg text-gray-600">
                        Testez vos connaissances avec nos quiz interactifs
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Quizzes */}
                {quizzes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((quiz) => (
                            <QuizCard key={quiz._id} quiz={quiz} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-gray-600 text-lg">
                            Aucun quiz disponible pour le moment
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
