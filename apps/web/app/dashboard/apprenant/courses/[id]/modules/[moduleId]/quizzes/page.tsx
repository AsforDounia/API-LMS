"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, BookOpen, Clock, Trophy, AlertCircle, ArrowLeft } from "lucide-react"
import { quizApi, quizAttemptApi } from "@/lib/quiz-api"
import { Quiz, QuizAttempt } from "@/types/quiz.types"
import api from "@/lib/api"

export default function ModuleQuizzesPage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = params.moduleId as string
  const courseId = params.id as string

  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [attempts, setAttempts] = useState<Map<string, QuizAttempt[]>>(new Map())
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [moduleName, setModuleName] = useState<string>("")

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get current user
        const userRes = await api.get("/auth/profile")
        const currentUserId = userRes.data._id
        setUserId(currentUserId)

        // Get module name
        try {
          const moduleRes = await api.get(`/modules/${moduleId}`)
          setModuleName(moduleRes.data?.title || "Module")
        } catch (err) {
          console.log("Could not fetch module details")
        }

        // Get quizzes for this module
        const quizzesData = await quizApi.getByModule(moduleId)
        setQuizzes(quizzesData)

        // Get attempts for each quiz
        const attemptsMap = new Map<string, QuizAttempt[]>()
        for (const quiz of quizzesData) {
          try {
            const quizAttempts = await quizAttemptApi.getByQuiz(quiz._id)
            attemptsMap.set(quiz._id, quizAttempts)
          } catch (err) {
            console.log(`Could not fetch attempts for quiz ${quiz._id}`)
            attemptsMap.set(quiz._id, [])
          }
        }
        setAttempts(attemptsMap)
      } catch (error) {
        console.error("Error loading quizzes:", error)
        setError("Failed to load quizzes for this module")
      } finally {
        setLoading(false)
      }
    }

    if (moduleId) {
      loadData()
    }
  }, [moduleId])

  const getQuizAttempts = (quizId: string) => {
    return attempts.get(quizId) || []
  }

  const getLastAttempt = (quizId: string) => {
    const quizAttempts = getQuizAttempts(quizId)
    return quizAttempts.length > 0 ? quizAttempts[quizAttempts.length - 1] : null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Modules
        </button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {moduleName} - Quizzes
        </h1>
        <p className="text-gray-600">Test your knowledge with quizzes in this module</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Quizzes List */}
      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No quizzes available in this module yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => {
            const lastAttempt = getLastAttempt(quiz._id)
            const canRetake = true

            return (
              <Card
                key={quiz._id}
                className="flex flex-col hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{quiz.title}</CardTitle>
                      <p className="text-sm text-gray-600">{quiz.description}</p>
                    </div>
                    {lastAttempt && lastAttempt.passed && (
                      <Trophy className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pb-3">
                  {/* Quiz Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        {quiz.timeLimit ? `${quiz.timeLimit} minutes` : "No time limit"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span>{quiz.questions?.length || 0} questions</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Pass Score: <span className="font-semibold">{quiz.passingScore}%</span>
                    </div>
                  </div>

                  {/* Last Attempt Score */}
                  {lastAttempt && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Last Attempt</div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          {lastAttempt.score}%
                        </span>
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded ${
                            lastAttempt.passed
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {lastAttempt.passed ? "Passed" : "Failed"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Attempt #{lastAttempt.attemptNumber}
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Action Button */}
                <div className="px-6 pb-6 pt-0">
                  <Link href={`/dashboard/apprenant/quizzes/${quiz._id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      {lastAttempt ? "Retake Quiz" : "Start Quiz"}
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
