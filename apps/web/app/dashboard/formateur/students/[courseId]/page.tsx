'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { StudentProgressReport, formateurApi } from '@/lib/formateur-api';
import ProgressBar from '@/components/formateur/ProgressBar';
import LoadingSpinner from '@/components/formateur/LoadingSpinner';
import ErrorMessage from '@/components/formateur/ErrorMessage';

export default function CourseStudentsPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;

  const [reports, setReports] = useState<StudentProgressReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchProgress = async () => {
    if (!token || !courseId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await formateurApi.getCourseProgress (courseId);
      setReports(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [token, courseId]);

  if (loading) return <LoadingSpinner />;

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
          Retour aux cours
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {reports[0]?.courseTitle || 'Cours'}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="font-semibold">{reports.length}</span>
              <span className="ml-1">étudiant{reports.length > 1 ? 's' : ''} inscrit{reports.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={fetchProgress} />
          </div>
        )}

        {/* Empty State */}
        {!error && reports.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun étudiant inscrit
            </h3>
            <p className="text-gray-500">
              Aucun étudiant ne s'est encore inscrit à ce cours
            </p>
          </div>
        )}

        {/* Students Table */}
        {!error && reports.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Étudiant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Progression
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quiz
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Score moyen
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Dernière activité
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.studentId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {report.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.studentEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <ProgressBar percentage={report.overallProgress} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {report.totalQuizzesPassed}
                        </span>
                        <span className="text-sm text-gray-500">
                          /{report.totalQuizzesTaken}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {report.averageQuizScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {report.lastActivityAt
                          ? new Date(report.lastActivityAt).toLocaleDateString('fr-FR')
                          : 'Aucune'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/formateur/students/${courseId}/${report.studentId}`
                            )
                          }
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                        >
                          Voir détails →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}