'use client'

import { useState } from 'react'
import { Question } from '@/types/quiz.types'

interface QuestionFormProps {
    question: Question
    onSubmit: (answer: number[]) => Promise<void>
}

export default function QuestionForm({
    question,
    onSubmit,
}: QuestionFormProps) {
    const [answer, setAnswer] = useState<number[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            await onSubmit(answer)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {question.text}
                </h2>

                {question.options && question.options.length > 0 ? (
                    <div className="space-y-3">
                        {question.options.map((option: any) => (
                            <label
                                key={option.id}
                                className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 cursor-pointer"
                            >
                                <input
                                    type={
                                        question.type === 'multiple_choice' ? 'checkbox' : 'radio'
                                    }
                                    checked={answer.includes(option.id)}
                                    onChange={(e) => {
                                        if (question.type === 'multiple_choice') {
                                            if (e.target.checked) {
                                                setAnswer([...answer, option.id])
                                            } else {
                                                setAnswer(answer.filter((id) => id !== option.id))
                                            }
                                        } else {
                                            setAnswer([option.id])
                                        }
                                    }}
                                    className="w-5 h-5"
                                />
                                <span className="text-gray-700">{option.text}</span>
                            </label>
                        ))}
                    </div>
                ) : (
                    <textarea
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        rows={4}
                        placeholder="Votre réponse..."
                        onChange={(e) => setAnswer([Number(e.target.value)])}
                    />
                )}
            </div>

            <button
                onClick={handleSubmit}
                disabled={isSubmitting || answer.length === 0}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
                {isSubmitting ? 'Envoi...' : 'Soumettre'}
            </button>
        </div>
    )
}
