import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { Course } from '../../types';
import { LEVEL_COURSE_LIST, CAT_DESCRIPTIONS, toDbLevel } from '../../data/courseData';
import { getCourseDetails } from '../../data/courseDetails';
import { parseCourseExtras, CourseExtras } from '../../data/courseExtras';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Badge from '../../components/ui/Badge';

export default function AdminCourses() {
  const qc = useQueryClient();
  const migrationStarted = useRef(false);
  const [migrating, setMigrating] = useState<{ done: number; total: number } | null>(null);

  const { data: courses, isLoading: loadingCourses } = useQuery<Course[]>({
    queryKey: ['admin-courses'],
    queryFn: () => api.get('/courses').then((r) => r.data),
  });

  const { data: settings, isLoading: loadingSettings } = useQuery<Record<string, string>>({
    queryKey: ['admin-settings'],
    queryFn: () => api.get('/settings').then((r) => r.data),
  });

  // One-time move of the existing catalogue (the ~50 preview courses shown
  // on the public Courses page) into real, admin-editable course rows, saved
  // as drafts so nothing goes live or gets priced without you choosing to.
  useEffect(() => {
    if (loadingCourses || loadingSettings || migrationStarted.current) return;
    if (settings?.staticCoursesMigrated === 'true') return;
    migrationStarted.current = true;

    (async () => {
      const seen = new Set<string>();
      const toCreate: { title: string; cat: string; level: string }[] = [];
      for (const [level, groups] of Object.entries(LEVEL_COURSE_LIST)) {
        for (const { cat, courses: titles } of groups) {
          for (const title of titles) {
            if (seen.has(title)) continue;
            seen.add(title);
            toCreate.push({ title, cat, level });
          }
        }
      }

      setMigrating({ done: 0, total: toCreate.length });
      const extras: Record<string, CourseExtras> = parseCourseExtras(settings?.courseExtras);

      for (let i = 0; i < toCreate.length; i++) {
        const { title, cat, level } = toCreate[i];
        try {
          const { data } = await api.post('/courses', {
            title,
            description: CAT_DESCRIPTIONS[cat] ?? 'This programme is designed to build specialist knowledge and practical skills for professionals in the food industry.',
            faculty: cat,
            price: 0,
            currency: 'NGN',
            duration: '',
            level: toDbLevel(level),
            published: false,
            featured: false,
          });
          const details = getCourseDetails(title);
          if (details) extras[data.id] = details;
        } catch {
          // skip a failed one and keep going — nothing already created is lost
        }
        setMigrating({ done: i + 1, total: toCreate.length });
      }

      await api.put('/settings', {
        staticCoursesMigrated: 'true',
        courseExtras: JSON.stringify(extras),
      });
      qc.invalidateQueries({ queryKey: ['admin-courses'] });
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      setMigrating(null);
    })();
  }, [loadingCourses, loadingSettings, settings, qc]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/courses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-courses'] }),
  });

  const togglePublish = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      api.put(`/courses/${id}`, { published: !published }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-courses'] }),
  });

  if (loadingCourses || loadingSettings) return <LoadingSpinner />;

  if (migrating) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center py-24">
        <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
        <h2 className="font-bold text-gray-900 mb-1">Setting up your course catalogue</h2>
        <p className="text-sm text-gray-500 mb-4">This happens once — bringing your existing programmes into this list as drafts.</p>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${(migrating.done / migrating.total) * 100}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">{migrating.done} of {migrating.total}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500">Every course on the site — published and draft.</p>
        </div>
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
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Category</th>
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
                          onClick={() => { if (confirm('Delete this course? Students who were enrolled will lose access. This cannot be undone.')) deleteMutation.mutate(course.id); }}
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
