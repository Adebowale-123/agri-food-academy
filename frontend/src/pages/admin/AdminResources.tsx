import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Upload, Download } from 'lucide-react';
import api from '../../services/api';
import { Resource } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const CATEGORIES = ['General', 'Food Safety', 'Agro-Processing', 'Regulatory', 'Business', 'Technology'];

function formatSize(bytes?: number) {
  if (!bytes) return '';
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function AdminResources() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [newRes, setNewRes] = useState({ title: '', description: '', category: 'General', featured: false });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['admin-resources'],
    queryFn: () => api.get('/resources').then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/resources/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-resources'] }),
  });

  async function handleUpload() {
    if (!fileRef.current?.files?.[0]) { setError('Select a file'); return; }
    if (!newRes.title) { setError('Title required'); return; }
    try {
      setError('');
      setUploading(true);
      const fd = new FormData();
      fd.append('file', fileRef.current.files[0]);
      fd.append('title', newRes.title);
      fd.append('description', newRes.description);
      fd.append('category', newRes.category);
      fd.append('featured', String(newRes.featured));
      await api.post('/resources', fd);
      qc.invalidateQueries({ queryKey: ['admin-resources'] });
      setNewRes({ title: '', description: '', category: 'General', featured: false });
      if (fileRef.current) fileRef.current.value = '';
      setShowForm(false);
    } catch { setError('Upload failed'); }
    finally { setUploading(false); }
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Upload Resource</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Upload New Resource</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="label">Title *</label><input className="input" value={newRes.title} onChange={(e) => setNewRes({ ...newRes, title: e.target.value })} /></div>
              <div>
                <label className="label">Category</label>
                <select className="input bg-white" value={newRes.category} onChange={(e) => setNewRes({ ...newRes, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div><label className="label">Description</label><input className="input" value={newRes.description} onChange={(e) => setNewRes({ ...newRes, description: e.target.value })} /></div>
            <div>
              <label className="label">File *</label>
              <input ref={fileRef} type="file" className="input py-2" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={newRes.featured} onChange={(e) => setNewRes({ ...newRes, featured: e.target.checked })} className="w-4 h-4 accent-primary" /><span className="text-sm">Featured</span></label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button onClick={handleUpload} disabled={uploading} className="btn-primary flex items-center gap-2">
                <Upload className="w-4 h-4" />{uploading ? 'Uploading...' : 'Upload'}
              </button>
              <button onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Resource</th>
            <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Category</th>
            <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Size</th>
            <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Downloads</th>
            <th className="text-right px-5 py-3 text-sm font-semibold text-gray-600">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {!resources || resources.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">No resources yet</td></tr>
            ) : (
              resources.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-400 uppercase">{r.fileType}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{r.category}</td>
                  <td className="px-5 py-4 text-sm text-gray-400">{formatSize(r.fileSize)}</td>
                  <td className="px-5 py-4 text-sm font-medium text-primary">{r.downloads}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(r.id); }} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
