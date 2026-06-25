import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, Users, BookOpen, ChevronDown, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import api from '../services/api';
import { Course } from '../types';
import { useAuthStore } from '../store/auth';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated } = useAuthStore();
  const [openModule, setOpenModule] = useState<string | null>(null);

  const { data: course, isLoading } = useQuery<Course>({
    queryKey: ['course', slug],
    queryFn: () => api.get(`/courses/${slug}`).then((r) => r.data),
  });

  if (isLoading) return <div className="pt-16"><LoadingSpinner /></div>;
  if (!course) return <div className="pt-16 text-center py-20 text-gray-400">Course not found.</div>;

  const price = course.price === 0 ? 'Free' : `${course.currency === 'GBP' ? '£' : '₦'}${course.price.toLocaleString()}`;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/courses" className="flex items-center gap-2 text-primary-100 hover:text-white mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Badge variant="accent" className="mb-4">{course.faculty}</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-primary-100 text-lg leading-relaxed mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-primary-100">
                {course.duration && <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{course.duration}</span>}
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />{course.level}</span>
                {course._count && <span className="flex items-center gap-2"><Users className="w-4 h-4" />{course._count.enrollments} enrolled</span>}
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl h-fit">
              <div className="text-4xl font-bold text-primary mb-2">{price}</div>
              {course.currency === 'NGN' && course.price > 0 && (
                <p className="text-gray-400 text-sm mb-4">Nigerian Naira</p>
              )}
              {course.currency === 'GBP' && course.price > 0 && (
                <p className="text-gray-400 text-sm mb-4">British Pounds</p>
              )}
              {isAuthenticated() ? (
                <Link
                  to="/portal/courses"
                  className="w-full block text-center bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors mb-3"
                >
                  Go to My Courses
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="w-full block text-center bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-light transition-colors mb-3"
                >
                  Register to Enroll
                </Link>
              )}
              <p className="text-xs text-gray-400 text-center">30-day money-back guarantee</p>
              <div className="mt-5 border-t border-gray-100 pt-5 space-y-2">
                {course.duration && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Faculty</span>
                  <span className="font-medium">{course.faculty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-primary mb-8">Course Curriculum</h2>
          {course.modules && course.modules.length > 0 ? (
            <div className="space-y-3">
              {course.modules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50"
                    onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-gray-900">{module.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>{module.materials.length} files</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openModule === module.id ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {openModule === module.id && (
                    <div className="border-t border-gray-100 divide-y divide-gray-50">
                      {module.materials.length === 0 ? (
                        <p className="px-5 py-3 text-sm text-gray-400">No materials yet</p>
                      ) : (
                        module.materials.map((mat) => (
                          <div key={mat.id} className="flex items-center justify-between px-5 py-3">
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                              <span className="text-xs uppercase font-medium bg-gray-100 px-2 py-0.5 rounded">{mat.type}</span>
                              {mat.title}
                            </div>
                            {isAuthenticated() ? (
                              <CheckCircle className="w-4 h-4 text-secondary" />
                            ) : (
                              <Lock className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Curriculum details coming soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}
