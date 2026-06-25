import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Users } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AdminStudents() {
  const qc = useQueryClient();

  const { data: students, isLoading } = useQuery({
    queryKey: ['admin-students'],
    queryFn: () => api.get('/admin/students').then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/students/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-students'] }),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <span className="text-gray-500 text-sm">{students?.length || 0} registered</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Student</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Country</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Enrolled Courses</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Joined</th>
                <th className="text-right px-5 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!students || students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400">No students registered yet</p>
                  </td>
                </tr>
              ) : (
                students.map((s: any) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary-50 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                          {s.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{s.name}</p>
                          <p className="text-xs text-gray-400">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{s.country || '—'}</td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-primary">{s._count?.enrollments || 0}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => { if (confirm('Delete this student?')) deleteMutation.mutate(s.id); }}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
