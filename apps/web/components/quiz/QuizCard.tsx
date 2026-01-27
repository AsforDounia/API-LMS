'use client'

import { Quiz } from '@/types/quiz.types'
import Link from 'next/link'
import { ArrowRight, Clock, Award } from 'lucide-react'

interface QuizCardProps {
    quiz: Quiz
}

export default function QuizCard({ quiz }: QuizCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200">
            {/* Top Badge */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>

            <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {quiz.title}
                </h3>

                {/* Description */}
                {quiz.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {quiz.description}
                    </p>
                )}

                {/* Info Row */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 flex-wrap">
                    {quiz.duration && (
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{quiz.duration} min</span>
                        </div>
                    )}

                    <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{quiz.passingScore}% pour réussir</span>
                    </div>
                </div>

                {/* Button */}
                <Link
                    href={`/quiz/${quiz._id}`}
                    className="inline-flex items-center gap-2 w-full justify-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Commencer le quiz
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
