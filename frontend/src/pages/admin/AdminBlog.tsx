import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import api from '../../services/api';
import { BlogPost } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const CATEGORIES = ['General', 'Food Safety', 'Agro-Processing', 'Regulatory', 'Business', 'Technology', 'Sustainability'];

function PostForm({ initial, onSave, onClose }: { initial?: BlogPost; onSave: (data: any) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    excerpt: initial?.excerpt || '',
    content: initial?.content || '',
    category: initial?.category || 'General',
    published: initial?.published || false,
  });
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{initial ? 'Edit Post' : 'New Blog Post'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="space-y-4">
          <div><label className="label">Title *</label><input className="input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Post title" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Category</label>
              <select className="input bg-white" value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-primary" /><span className="text-sm">Published</span></label>
            </div>
          </div>
          <div><label className="label">Excerpt</label><textarea className="input resize-none h-20" value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="Short summary..." /></div>
          <div><label className="label">Content (HTML)</label><textarea className="input resize-none h-48 font-mono text-sm" value={form.content} onChange={(e) => set('content', e.target.value)} placeholder="<p>Your content here...</p>" /></div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => onSave(form)} className="btn-primary flex-1">Save Post</button>
            <button onClick={onClose} className="btn-outline flex-1">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlog() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<BlogPost | null | 'new'>(null);

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['admin-blog'],
    queryFn: () => api.get('/blog').then((r) => r.data),
  });

  const createMutation = useMutation({ mutationFn: (data: any) => api.post('/blog', data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blog'] }); setEditing(null); } });
  const updateMutation = useMutation({ mutationFn: ({ id, data }: any) => api.put(`/blog/${id}`, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blog'] }); setEditing(null); } });
  const deleteMutation = useMutation({ mutationFn: (id: string) => api.delete(`/blog/${id}`), onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-blog'] }) });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <button onClick={() => setEditing('new')} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> New Post</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Title</th>
            <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Category</th>
            <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Status</th>
            <th className="text-left px-5 py-3 text-sm font-semibold text-gray-600">Date</th>
            <th className="text-right px-5 py-3 text-sm font-semibold text-gray-600">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {!posts || posts.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">No posts yet</td></tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900 max-w-xs truncate">{post.title}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{post.category}</td>
                  <td className="px-5 py-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{post.published ? 'Published' : 'Draft'}</span></td>
                  <td className="px-5 py-4 text-sm text-gray-400">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '—'}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(post)} className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(post.id); }} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <PostForm
          initial={editing === 'new' ? undefined : editing}
          onSave={(data) => editing === 'new' ? createMutation.mutate(data) : updateMutation.mutate({ id: (editing as BlogPost).id, data })}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
