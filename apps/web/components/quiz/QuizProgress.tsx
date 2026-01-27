'use client'

interface QuizProgressProps {
  current: number
  total: number
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Progression</span>
        <span className="text-sm font-bold text-blue-600">
          {current} / {total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-gray-500">{Math.round(percentage)}% terminé</div>
    </div>
  )
}
