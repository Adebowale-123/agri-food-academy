import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';
import { Course } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Badge from '../../components/ui/Badge';

export default function AdminCourses() {
  const qc = useQueryClient();

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['admin-courses'],
    queryFn: () => api.get('/courses').then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/courses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-courses'] }),
  });

  const togglePublish = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      api.put(`/courses/${id}`, { published: !published }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-courses'] }),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <Link to="/admin/courses/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Course
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Course</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Faculty</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Price</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Level</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-right px-5 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!courses || courses.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">No courses yet. Create your first course.</td></tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-xs text-gray-400">{course.duration}</p>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="green">{course.faculty}</Badge>
                    </td>
                    <td className="px-5 py-4 font-medium">
                      {course.price === 0 ? 'Free' : `${course.currency === 'GBP' ? '£' : '₦'}${course.price.toLocaleString()}`}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{course.level}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${course.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {course.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish.mutate({ id: course.id, published: course.published })}
                          className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"
                          title={course.published ? 'Unpublish' : 'Publish'}
                        >
                          {course.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link to={`/admin/courses/${course.id}/edit`} className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => { if (confirm('Delete this course?')) deleteMutation.mutate(course.id); }}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
