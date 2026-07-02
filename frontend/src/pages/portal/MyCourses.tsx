import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Award } from 'lucide-react';
import api from '../../services/api';
import { Enrollment } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function MyCourses() {
  const { data: enrollments, isLoading } = useQuery<Enrollment[]>({
    queryKey: ['my-enrollments'],
    queryFn: () => api.get('/enrollments/my').then((r) => r.data),
  });

  return (
    <div className="pt-16 min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">My Courses</h1>
            <p className="text-gray-500 mt-1">Access your enrolled courses and learning materials</p>
          </div>
          <Link to="/courses" className="btn-primary">Browse More Courses</Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : !enrollments || enrollments.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h2>
            <p className="text-gray-500 mb-6">Enroll in a course to start learning</p>
            <Link to="/courses" className="btn-primary">Browse Courses</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;
              if (!course) return null;
              const totalModules = course.modules?.length || 0;
              const totalMaterials = course.modules?.reduce((sum, m) => sum + (m._count?.materials || 0), 0) || 0;
              const isCompleted = enrollment.status === 'completed';
              const hasCertificate = !!(enrollment as any).certificate;

              return (
                <div key={enrollment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  <div className={`h-32 flex items-center justify-center ${isCompleted ? 'bg-gradient-to-br from-green-600 to-green-700' : 'bg-gradient-to-br from-primary to-primary-light'}`}>
                    {isCompleted ? (
                      <Award className="w-12 h-12 text-white/60" />
                    ) : (
                      <BookOpen className="w-12 h-12 text-white/40" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {isCompleted ? '✓ Completed' : 'In Progress'}
                    </span>
                    <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{course.faculty}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span>{totalModules} modules</span>
                      <span>{totalMaterials} files</span>
                    </div>
                    <div className="mt-auto space-y-2">
                      <Link
                        to={`/portal/courses/${enrollment.courseId}`}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
                      >
                        {isCompleted ? 'Review Course' : 'Access Course'} <ArrowRight className="w-4 h-4" />
                      </Link>
                      {hasCertificate && (
                        <a
                          href={`/api/certificates/${enrollment.courseId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          <Award className="w-4 h-4" /> Download Certificate
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
