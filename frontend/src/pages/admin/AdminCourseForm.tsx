import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus, Trash2, Upload, X } from 'lucide-react';
import api from '../../services/api';
import { Course, CourseModule, CourseMaterial } from '../../types';
import { parseCourseExtras } from '../../data/courseExtras';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const CURRENCIES = ['NGN', 'GBP', 'USD'];
const DEFAULT_MODULE_TITLE = 'Course Materials';

export default function AdminCourseForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new' || !id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [form, setForm] = useState({ title: '', description: '', faculty: '', price: '0', currency: 'NGN', duration: '', level: 'Beginner', published: false, featured: false });
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [extras, setExtras] = useState({ targetAudience: '', outcomes: '', benefits: '', whatYouReceive: '' });
  const [savingExtras, setSavingExtras] = useState(false);
  const [extrasSaved, setExtrasSaved] = useState(false);

  const { data: course, isLoading } = useQuery<Course>({
    queryKey: ['admin-course', id],
    queryFn: () => api.get(`/courses/${id}`).then((r) => r.data),
    enabled: !isNew,
  });

  // The list of categories is managed on the Categories page — this form
  // only picks from it.
  const { data: settings } = useQuery<Record<string, string>>({
    queryKey: ['admin-settings'],
    queryFn: () => api.get('/settings').then((r) => r.data),
  });
  let categoryOptions: string[] = [];
  try {
    categoryOptions = settings?.categories ? JSON.parse(settings.categories) : [];
  } catch { categoryOptions = []; }
  // Keep a course's existing category selectable even if it was later
  // removed from the managed list, so the field never shows blank.
  if (course?.faculty && !categoryOptions.includes(course.faculty)) categoryOptions = [course.faculty, ...categoryOptions];

  useEffect(() => {
    if (!isNew && form.faculty) return;
    if (categoryOptions.length && !form.faculty) setForm((f) => ({ ...f, faculty: categoryOptions[0] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryOptions.length]);

  useEffect(() => {
    if (course) {
      setForm({
        title: course.title, description: course.description, faculty: course.faculty,
        price: String(course.price), currency: course.currency, duration: course.duration || '',
        level: course.level, published: course.published, featured: course.featured,
      });
      setModules(course.modules || []);
    }
  }, [course]);

  useEffect(() => {
    if (course && settings) {
      const mine = parseCourseExtras(settings.courseExtras)[course.id];
      if (mine) {
        setExtras({
          targetAudience: (mine.targetAudience || []).join('\n'),
          outcomes: (mine.outcomes || []).join('\n'),
          benefits: (mine.benefits || []).join('\n'),
          whatYouReceive: (mine.whatYouReceive || []).join('\n'),
        });
      }
    }
  }, [course, settings]);

  async function handleSaveExtras() {
    if (!course) return;
    setSavingExtras(true);
    try {
      const allExtras = parseCourseExtras(settings?.courseExtras);
      const toLines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);
      allExtras[course.id] = {
        targetAudience: toLines(extras.targetAudience),
        outcomes: toLines(extras.outcomes),
        benefits: toLines(extras.benefits),
        whatYouReceive: toLines(extras.whatYouReceive),
      };
      await api.put('/settings', { courseExtras: JSON.stringify(allExtras) });
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      setExtrasSaved(true);
      setTimeout(() => setExtrasSaved(false), 2500);
    } catch {
      setError('Failed to save the extra course content');
    } finally {
      setSavingExtras(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError('');
      if (isNew) {
        const { data } = await api.post('/courses', form);
        // Every course starts with one module ready to go, so admins can
        // jump straight to uploading files instead of naming a module first.
        await api.post(`/courses/${data.id}/modules`, { title: DEFAULT_MODULE_TITLE, order: 1 });
        qc.invalidateQueries({ queryKey: ['admin-courses'] });
        navigate(`/admin/courses/${data.id}/edit`);
      } else {
        await api.put(`/courses/${id}`, form);
        qc.invalidateQueries({ queryKey: ['admin-courses'] });
        qc.invalidateQueries({ queryKey: ['admin-course', id] });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function addModule() {
    if (!newModuleTitle.trim() || isNew) return;
    try {
      const { data } = await api.post(`/courses/${id}/modules`, { title: newModuleTitle, order: modules.length + 1 });
      setModules([...modules, { ...data, materials: [] }]);
      setNewModuleTitle('');
    } catch { setError('Failed to add module'); }
  }

  async function deleteModule(moduleId: string) {
    if (!confirm('Delete this module and all its materials?')) return;
    try {
      await api.delete(`/courses/modules/${moduleId}`);
      setModules(modules.filter((m) => m.id !== moduleId));
    } catch { setError('Failed to delete module'); }
  }

  async function uploadMaterials(moduleId: string, files: FileList) {
    const fileList = Array.from(files);
    setUploadingFor(moduleId);
    setUploadProgress({ done: 0, total: fileList.length });
    for (let i = 0; i < fileList.length; i++) {
      try {
        const fd = new FormData();
        fd.append('file', fileList[i]);
        fd.append('title', fileList[i].name);
        const { data } = await api.post(`/courses/modules/${moduleId}/materials`, fd);
        setModules((prev) => prev.map((m) => m.id === moduleId ? { ...m, materials: [...m.materials, data] } : m));
      } catch {
        setError(`Failed to upload "${fileList[i].name}"`);
      }
      setUploadProgress({ done: i + 1, total: fileList.length });
    }
    setUploadingFor(null);
    setUploadProgress(null);
  }

  async function deleteMaterial(moduleId: string, materialId: string) {
    try {
      await api.delete(`/courses/materials/${materialId}`);
      setModules(modules.map((m) => m.id === moduleId ? { ...m, materials: m.materials.filter((mat) => mat.id !== materialId) } : m));
    } catch { setError('Failed to delete material'); }
  }

  if (!isNew && isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/courses" className="p-2 rounded-lg hover:bg-gray-100"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Course' : 'Edit Course'}</h1>
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg mb-4">{error}</p>}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Course Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="label">Title *</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Course title" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Description *</label>
            <textarea className="input resize-none h-28" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Course description" />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input bg-white" value={form.faculty} onChange={(e) => setForm({ ...form, faculty: e.target.value })}>
              {categoryOptions.length === 0 && <option value="">No categories yet</option>}
              {categoryOptions.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Need a new one? Add it on the <Link to="/admin/categories" className="text-primary underline">Categories</Link> page first.
            </p>
          </div>
          <div>
            <label className="label">Level</label>
            <select className="input bg-white" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Price</label>
            <input type="number" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div>
            <label className="label">Currency</label>
            <select className="input bg-white" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
              {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Duration</label>
            <input className="input" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 8 weeks" />
          </div>
          <div className="flex items-center gap-6 pt-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-primary" />
              <span className="text-sm font-medium text-gray-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
              <span className="text-sm font-medium text-gray-700">Featured</span>
            </label>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-100 flex gap-3">
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : isNew ? 'Create Course' : 'Save Changes'}
          </button>
          <Link to="/admin/courses" className="btn-outline">Cancel</Link>
        </div>
      </div>

      {!isNew && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Modules & Materials</h2>

          {/* Add module */}
          <div className="flex gap-2 mb-6">
            <input
              className="input flex-1"
              placeholder="Module title..."
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addModule()}
            />
            <button onClick={addModule} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Module
            </button>
          </div>

          <div className="space-y-4">
            {modules.map((module, idx) => (
              <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                  <span className="font-medium text-gray-900">{idx + 1}. {module.title}</span>
                  <button onClick={() => deleteModule(module.id)} className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  {module.materials.map((mat) => (
                    <div key={mat.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="text-sm">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded mr-2 uppercase">{mat.type}</span>
                        {mat.title}
                      </div>
                      <button onClick={() => deleteMaterial(module.id, mat.id)} className="p-1 text-gray-300 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <label className={`mt-3 flex items-center gap-2 cursor-pointer border-2 border-dashed border-gray-200 rounded-lg p-3 hover:border-primary hover:bg-primary-50 transition-colors ${uploadingFor === module.id ? 'opacity-50' : ''}`}>
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {uploadingFor === module.id
                        ? `Uploading ${uploadProgress?.done ?? 0} of ${uploadProgress?.total ?? 0}...`
                        : 'Upload files — select as many PDFs, videos or docs as you like at once'}
                    </span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      disabled={uploadingFor !== null}
                      onChange={(e) => { if (e.target.files?.length) uploadMaterials(module.id, e.target.files); e.target.value = ''; }}
                    />
                  </label>
                </div>
              </div>
            ))}
            {modules.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Add a module above to start building the curriculum</p>}
          </div>
        </div>
      )}

      {!isNew && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Who Should Attend, Outcomes &amp; Benefits</h2>
          <p className="text-sm text-gray-500 mb-5">Shown on the course page. One point per line — leave a box empty to hide that section.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Who Should Attend?</label>
              <textarea
                className="input resize-none h-32"
                placeholder={'Food Safety Managers\nQuality Assurance Managers\n...'}
                value={extras.targetAudience}
                onChange={(e) => setExtras({ ...extras, targetAudience: e.target.value })}
              />
            </div>
            <div>
              <label className="label">What Will You Gain?</label>
              <textarea
                className="input resize-none h-32"
                placeholder={'HACCP implementation skills\nRisk assessment competence\n...'}
                value={extras.outcomes}
                onChange={(e) => setExtras({ ...extras, outcomes: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Career &amp; Business Benefits</label>
              <textarea
                className="input resize-none h-32"
                placeholder={'Qualification for leadership roles\nGlobally recognised skills\n...'}
                value={extras.benefits}
                onChange={(e) => setExtras({ ...extras, benefits: e.target.value })}
              />
            </div>
            <div>
              <label className="label">What You Will Receive (optional)</label>
              <textarea
                className="input resize-none h-32"
                placeholder={'Templates and toolkits\nAFIA Certificate of Completion\n...'}
                value={extras.whatYouReceive}
                onChange={(e) => setExtras({ ...extras, whatYouReceive: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-3">
            <button onClick={handleSaveExtras} disabled={savingExtras} className="btn-primary">
              {savingExtras ? 'Saving...' : 'Save'}
            </button>
            {extrasSaved && <span className="text-sm text-green-600">Saved!</span>}
          </div>
        </div>
      )}
    </div>
  );
}
