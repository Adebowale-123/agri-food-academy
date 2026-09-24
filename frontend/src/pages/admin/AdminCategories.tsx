import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Tags } from 'lucide-react';
import api from '../../services/api';
import { Course } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const STARTER_CATEGORIES = [
  'Food Safety & Compliance', 'Food Manufacturing Engineering', 'Food Science & Laboratory Systems',
  'Product Development & Innovation', 'Food Entrepreneurship & Industry', 'Health, Safety & Environment (HSE)',
  'Quality Management & Systems', 'Technology & Digital',
];

export default function AdminCategories() {
  const qc = useQueryClient();
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  const { data: settings, isLoading: loadingSettings } = useQuery<Record<string, string>>({
    queryKey: ['admin-settings'],
    queryFn: () => api.get('/settings').then((r) => r.data),
  });

  const { data: courses, isLoading: loadingCourses } = useQuery<Course[]>({
    queryKey: ['admin-courses'],
    queryFn: () => api.get('/courses').then((r) => r.data),
  });

  const saveMutation = useMutation({
    mutationFn: (categories: string[]) => api.put('/settings', { categories: JSON.stringify(categories) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-settings'] }),
  });

  if (loadingSettings || loadingCourses) return <LoadingSpinner />;

  // First time this page is opened, seed the list with the starter set plus
  // whatever categories existing courses are already using, so nothing
  // already in use goes missing from the list.
  let categories: string[];
  try {
    categories = settings?.categories ? JSON.parse(settings.categories) : [];
  } catch {
    categories = [];
  }
  if (!settings?.categories) {
    const inUse = Array.from(new Set((courses ?? []).map((c) => c.faculty)));
    categories = Array.from(new Set([...STARTER_CATEGORIES, ...inUse]));
    saveMutation.mutate(categories);
  }

  const courseCountByCategory = (cat: string) => (courses ?? []).filter((c) => c.faculty === cat).length;

  function handleAdd() {
    const name = newCategory.trim();
    if (!name) return;
    if (categories.some((c) => c.toLowerCase() === name.toLowerCase())) {
      setError('That category already exists.');
      return;
    }
    setError('');
    saveMutation.mutate([...categories, name]);
    setNewCategory('');
  }

  function handleDelete(cat: string) {
    const inUse = courseCountByCategory(cat);
    const message = inUse > 0
      ? `${inUse} course${inUse !== 1 ? 's' : ''} currently use "${cat}". Delete it from the list anyway? Existing courses keep their category, it just won't be offered for new ones.`
      : `Delete the category "${cat}"?`;
    if (!confirm(message)) return;
    saveMutation.mutate(categories.filter((c) => c !== cat));
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
          <Tags className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">These are the categories available when creating a course.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <label className="label">Add a new category</label>
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="e.g. Sustainability & Regulatory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {categories.length === 0 ? (
          <p className="text-center py-12 text-gray-400">No categories yet. Add your first one above.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-gray-900">{cat}</p>
                  <p className="text-xs text-gray-400">{courseCountByCategory(cat)} course{courseCountByCategory(cat) !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={() => handleDelete(cat)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
