import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import api from '../../services/api';
import { Message } from '../../types';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useState } from 'react';

export default function AdminMessages() {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<Message | null>(null);

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ['admin-messages'],
    queryFn: () => api.get('/messages').then((r) => r.data),
  });

  const readMutation = useMutation({
    mutationFn: (id: string) => api.put(`/messages/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-messages'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/messages/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-messages'] }); setSelected(null); },
  });

  function openMessage(msg: Message) {
    setSelected(msg);
    if (!msg.read) readMutation.mutate(msg.id);
  }

  const unread = messages?.filter((m) => !m.read).length || 0;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        {unread > 0 && (
          <span className="bg-primary text-white text-xs px-2.5 py-0.5 rounded-full font-bold">{unread} new</span>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {!messages || messages.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors ${selected?.id === msg.id ? 'bg-primary-50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {!msg.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />}
                      <div className="min-w-0">
                        <p className={`text-sm font-medium truncate ${!msg.read ? 'text-gray-900' : 'text-gray-600'}`}>{msg.name}</p>
                        <p className="text-xs text-gray-400 truncate">{msg.subject}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 flex-shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div>
          {selected ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selected.subject}</h2>
                  <p className="text-gray-500 text-sm mt-1">From: <strong>{selected.name}</strong> ({selected.email})</p>
                  {selected.phone && <p className="text-gray-400 text-sm">Phone: {selected.phone}</p>}
                  <p className="text-gray-400 text-xs mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn-outline text-sm px-3 py-1.5">Reply</a>
                  <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(selected.id); }} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center text-gray-300">
              <MailOpen className="w-16 h-16 mx-auto mb-3" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
