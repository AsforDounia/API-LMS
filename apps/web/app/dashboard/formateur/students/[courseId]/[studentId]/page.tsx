'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { StudentProgressReport, formateurApi } from '@/lib/formateur-api';
import ProgressBar from '@/components/formateur/ProgressBar';
import LoadingSpinner from '@/components/formateur/LoadingSpinner';
import ErrorMessage from '@/components/formateur/ErrorMessage';

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  const studentId = params?.studentId as string;

  const [report, setReport] = useState<StudentProgressReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchProgress = async () => {
    if (!token || !courseId || !studentId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await formateurApi.getStudentProgress( courseId, studentId);
      setReport(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [token, courseId, studentId]);

  if (loading) return <LoadingSpinner />;

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:text-blue-700 font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          <ErrorMessage message={error || 'Données introuvables'} onRetry={fetchProgress} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste
        </button>

        {/* Student Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 mb-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{report.studentName}</h1>
              <p className="text-blue-100 text-lg">{report.studentEmail}</p>
              <p className="text-blue-100 text-sm mt-1">{report.courseTitle}</p>
            </div>
            <div className="text-right bg-white/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-5xl font-bold mb-1">{report.overallProgress}%</div>
              <p className="text-sm text-blue-100">Progression globale</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-100">Quiz réussis</p>
              </div>
              <p className="text-3xl font-bold">
                {report.totalQuizzesPassed}/{report.totalQuizzesTaken}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p className="text-sm text-blue-100">Score moyen</p>
              </div>
              <p className="text-3xl font-bold">{report.averageQuizScore}%</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-100">Dernière activité</p>
              </div>
              <p className="text-lg font-bold">
                {report.lastActivityAt
                  ? new Date(report.lastActivityAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short'
                    })
                  : 'Aucune'}
              </p>
            </div>
          </div>
        </div>

        {/* Module Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Progression des Modules
          </h2>
          
          {report.moduleProgress.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune progression enregistrée</p>
          ) : (
            <div className="space-y-4">
              {report.moduleProgress.map((module) => (
                <div key={module.moduleId} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {module.moduleTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          {module.completedLessons}/{module.totalLessons} leçons
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>
                          Dernier accès: {new Date(module.lastAccessedAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        module.completionPercentage === 100
                          ? 'bg-green-100 text-green-800'
                          : module.completionPercentage >= 50
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {module.completionPercentage}%
                      </span>
                    </div>
                  </div>
                  <ProgressBar percentage={module.completionPercentage} showLabel={false} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quiz Results */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Résultats des Quiz
          </h2>
          
          {report.quizResults.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun quiz tenté</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quiz
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Module
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Résultat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tentative
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.quizResults.map((quiz, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {quiz.quizTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {quiz.moduleTitle}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <span className="font-semibold text-gray-900">
                            {quiz.score}/{quiz.passingScore}
                          </span>
                          <span className="text-gray-500 ml-2">
                            ({quiz.percentage}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {quiz.passed ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Réussi
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Échoué
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        Tentative {quiz.attemptNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(quiz.attemptedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}