'use client'

import { Quiz } from '@/types/quiz.types'
import { Clock, Info } from 'lucide-react'

interface QuizHeaderProps {
  quiz: Quiz
}

export default function QuizHeader({ quiz }: QuizHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
      <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>

      {quiz.description && (
        <p className="text-blue-100 text-lg mb-6">{quiz.description}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-500 bg-opacity-50 rounded-lg p-4">
          <div className="text-blue-100 text-sm">Note de passage</div>
          <div className="text-2xl font-bold">{quiz.passingScore}%</div>
        </div>

        {quiz.duration && (
          <div className="bg-blue-500 bg-opacity-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-100" />
              <div className="text-blue-100 text-sm">Durée</div>
            </div>
            <div className="text-2xl font-bold">{quiz.duration} min</div>
          </div>
        )}

        <div className="bg-blue-500 bg-opacity-50 rounded-lg p-4">
          <div className="text-blue-100 text-sm">Requis</div>
          <div className="text-2xl font-bold">
            {quiz.isRequired ? '✓' : 'Non'}
          </div>
        </div>
      </div>

      <div className="bg-blue-500 bg-opacity-30 border-l-4 border-blue-200 rounded p-4 mt-6 flex gap-3">
        <Info className="w-5 h-5 flex-shrink-0 text-blue-200 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold">Instructions du quiz</p>
          <p className="text-blue-100 mt-1">
            Répondez à toutes les questions. Vous pouvez naviguer entre les
            questions avant de soumettre.
          </p>
        </div>
      </div>
    </div>
  )
}
