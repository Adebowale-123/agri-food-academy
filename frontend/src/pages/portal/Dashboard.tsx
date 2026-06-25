import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import { useAuthStore } from '../../store/auth';
import { Enrollment } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function PortalDashboard() {
  const { user } = useAuthStore();

  const { data: enrollments, isLoading } = useQuery<Enrollment[]>({
    queryKey: ['my-enrollments'],
    queryFn: () => api.get('/enrollments/my').then((r) => r.data),
  });

  return (
    <div className="pt-16 min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1">Here's an overview of your learning journey.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { icon: BookOpen, label: 'Enrolled Courses', value: enrollments?.length || 0 },
            { icon: Award, label: 'Completed', value: enrollments?.filter((e) => e.status === 'completed').length || 0 },
            { icon: Clock, label: 'In Progress', value: enrollments?.filter((e) => e.status === 'active').length || 0 },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            <Link to="/portal/courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : !enrollments || enrollments.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn-primary">Browse Courses</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.slice(0, 5).map((enrollment) => (
                <div key={enrollment.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{enrollment.course?.title}</h3>
                    <p className="text-sm text-gray-400">{enrollment.course?.faculty}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${enrollment.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {enrollment.status}
                    </span>
                    <Link to={`/portal/courses/${enrollment.courseId}`} className="btn-outline text-sm py-1.5">Open</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
