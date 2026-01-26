'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface QuizTimerProps {
  duration: number // en minutes
  onTimeUp: () => void
  isPaused?: boolean
}

export default function QuizTimer({ duration, onTimeUp, isPaused = false }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60) // convertir en secondes

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const isLowTime = timeLeft < 300 // moins de 5 minutes

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
      isLowTime ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
    }`}>
      <Clock className="w-5 h-5" />
      <span className="font-mono text-lg font-semibold">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}