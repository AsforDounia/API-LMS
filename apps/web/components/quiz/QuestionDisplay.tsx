'use client'

import { Question } from '@/types/quiz.types'
import AnswerOption from './AnswerOption'

interface QuestionDisplayProps {
  question: Question
  questionNumber: number
  selectedAnswers: number[]
  onAnswerChange: (answers: number[]) => void
  disabled?: boolean
}

export default function QuestionDisplay({
  question,
  questionNumber,
  selectedAnswers,
  onAnswerChange,
  disabled = false
}: QuestionDisplayProps) {
  const handleOptionChange = (index: number, checked: boolean) => {
    if (question.type === 'single_choice' || question.type === 'true_false') {
      // Pour choix unique : remplacer la sélection
      onAnswerChange(checked ? [index] : [])
    } else {
      // Pour choix multiple : ajouter/retirer de la liste
      if (checked) {
        onAnswerChange([...selectedAnswers, index])
      } else {
        onAnswerChange(selectedAnswers.filter(i => i !== index))
      }
    }
  }

  const inputType = question.type === 'multiple_choice' ? 'checkbox' : 'radio'

  return (
    <div className="space-y-4">
      {/* Numéro et texte de la question */}
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full font-semibold">
            {questionNumber}
          </span>
          <h3 className="text-lg font-medium text-gray-900 flex-1">
            {question.questionText}
          </h3>
        </div>
        <p className="text-sm text-gray-500 mt-2 ml-11">
          {question.type === 'multiple_choice' && '(Plusieurs réponses possibles)'}
          {question.type === 'single_choice' && '(Une seule réponse)'}
          {question.type === 'true_false' && '(Vrai ou Faux)'}
        </p>
      </div>

      {/* Options de réponse */}
      <div className="space-y-3 ml-11">
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswers.includes(index)}
            type={inputType}
            onChange={handleOptionChange}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}