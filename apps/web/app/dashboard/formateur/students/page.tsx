'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course, formateurApi } from '@/lib/formateur-api';
import CourseCard from '@/components/formateur/CourseCard';
import LoadingSpinner from '@/components/formateur/LoadingSpinner';
import ErrorMessage from '@/components/formateur/ErrorMessage';

export default function StudentsPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchCourses = async () => {
    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
        console.log("token",token)
      const data = await formateurApi.getMyCourses();
      setCourses(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des cours');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📚 Suivi des Apprenants
          </h1>
          <p className="text-gray-600 text-lg">
            Sélectionnez un cours pour voir la progression des étudiants
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={fetchCourses} />
          </div>
        )}

        {/* Empty State */}
        {!error && courses.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun cours trouvé
            </h3>
            <p className="text-gray-500 mb-6">
              Vous n'avez pas encore créé de cours
            </p>
            <button
              onClick={() => router.push('/dashboard/formateur/courses/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Créer mon premier cours
            </button>
          </div>
        )}

        {/* Courses Grid */}
        {!error && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onClick={() => router.push(`/dashboard/formateur/students/${course._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}