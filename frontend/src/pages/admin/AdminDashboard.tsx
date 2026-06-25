import { useQuery } from '@tanstack/react-query';
import { Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';
import api from '../../services/api';
import { AdminStats } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/admin/dashboard').then((r) => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const CARDS = [
    { icon: Users, label: 'Total Students', value: stats?.totalStudents || 0, color: 'text-blue-600 bg-blue-50' },
    { icon: BookOpen, label: 'Published Courses', value: stats?.totalCourses || 0, color: 'text-primary bg-primary-50' },
    { icon: TrendingUp, label: 'Total Enrollments', value: stats?.totalEnrollments || 0, color: 'text-purple-600 bg-purple-50' },
    { icon: DollarSign, label: 'Total Revenue (₦)', value: `₦${(stats?.totalRevenue || 0).toLocaleString()}`, color: 'text-accent bg-accent/20' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CARDS.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-gray-500 text-sm">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Enrollments</h2>
          <div className="space-y-3">
            {stats?.recentEnrollments?.slice(0, 8).map((e) => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{(e as any).user?.name}</p>
                  <p className="text-xs text-gray-400">{(e as any).course?.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">₦{((e.amount || 0)).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{new Date(e.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {!stats?.recentEnrollments?.length && <p className="text-gray-400 text-sm">No enrollments yet</p>}
          </div>
        </div>

        {/* Popular Courses */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Courses</h2>
          <div className="space-y-3">
            {stats?.popularCourses?.slice(0, 5).map((c, idx) => (
              <div key={c.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-7 h-7 bg-primary-50 rounded-lg flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{c.title}</p>
                  <p className="text-xs text-gray-400">{c.faculty}</p>
                </div>
                <span className="text-sm font-medium text-primary">{(c as any)._count?.enrollments} enrolled</span>
              </div>
            ))}
            {!stats?.popularCourses?.length && <p className="text-gray-400 text-sm">No course data yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
