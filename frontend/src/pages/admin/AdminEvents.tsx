import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import api from '../../services/api';
import { Event } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

function EventForm({ initial, onSave, onClose }: { initial?: Event; onSave: (data: any) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    date: initial?.date ? initial.date.slice(0, 16) : '',
    location: initial?.location || '',
    type: initial?.type || 'webinar',
    registrationUrl: initial?.registrationUrl || '',
    featured: initial?.featured || false,
    published: initial?.published !== false,
  });
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{initial ? 'Edit Event' : 'New Event'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="space-y-4">
          <div><label className="label">Title *</label><input className="input" value={form.title} onChange={(e) => set('title', e.target.value)} /></div>
          <div><label className="label">Description *</label><textarea className="input resize-none h-24" value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Date *</label><input type="datetime-local" className="input" value={form.date} onChange={(e) => set('date', e.target.value)} /></div>
            <div>
              <label className="label">Type</label>
              <select className="input bg-white" value={form.type} onChange={(e) => set('type', e.target.value)}>
                {['webinar', 'physical', 'hybrid'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div><label className="label">Location</label><input className="input" value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Venue or Online" /></div>
          <div><label className="label">Registration URL</label><input className="input" value={form.registrationUrl} onChange={(e) => set('registrationUrl', e.target.value)} /></div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-primary" /><span className="text-sm">Published</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-primary" /><span className="text-sm">Featured</span></label>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => onSave(form)} className="btn-primary flex-1">Save Event</button>
            <button onClick={onClose} className="btn-outline flex-1">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminEvents() {
  const qc = useQueryClient();
  const [editingEvent, setEditingEvent] = useState<Event | null | 'new'>(null);

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['admin-events'],
    queryFn: () => api.get('/events').then((r) => r.data),
  });

  const createMutation = useMutation({ mutationFn: (data: any) => api.post('/events', data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-events'] }); setEditingEvent(null); } });
  const updateMutation = useMutation({ mutationFn: ({ id, data }: any) => api.put(`/events/${id}`, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-events'] }); setEditingEvent(null); } });
  const deleteMutation = useMutation({ mutationFn: (id: string) => api.delete(`/events/${id}`), onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-events'] }) });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <button onClick={() => setEditingEvent('new')} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> New Event</button>
      </div>

      <div className="space-y-3">
        {!events || events.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <p className="text-gray-400">No events yet. Create your first event.</p>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${event.type === 'webinar' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{event.type}</span>
                  {!event.published && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Draft</span>}
                </div>
                <h3 className="font-bold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })} {event.location && `• ${event.location}`}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setEditingEvent(event)} className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"><Edit className="w-4 h-4" /></button>
                <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(event.id); }} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingEvent && (
        <EventForm
          initial={editingEvent === 'new' ? undefined : editingEvent}
          onSave={(data) => editingEvent === 'new' ? createMutation.mutate(data) : updateMutation.mutate({ id: (editingEvent as Event).id, data })}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </div>
  );
}
