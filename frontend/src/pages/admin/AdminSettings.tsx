import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function AdminSettings() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => api.get('/settings').then((r) => r.data),
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  async function handleSave() {
    try {
      setSaving(true);
      setError('');
      await api.put('/settings', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { setError('Failed to save settings'); }
    finally { setSaving(false); }
  }

  if (isLoading) return <LoadingSpinner />;

  const fields = [
    { key: 'siteName', label: 'Site Name', type: 'text' },
    { key: 'siteTagline', label: 'Tagline', type: 'text' },
    { key: 'email', label: 'Email Address', type: 'email' },
    { key: 'phone', label: 'Phone (Nigeria)', type: 'text' },
    { key: 'phoneUK', label: 'Phone (UK)', type: 'text' },
    { key: 'addressNigeria', label: 'Address (Nigeria)', type: 'text' },
    { key: 'addressUK', label: 'Address (UK)', type: 'text' },
    { key: 'about', label: 'About Text', type: 'textarea' },
  ];

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-5">
          {fields.map(({ key, label, type }) => (
            <div key={key}>
              <label className="label">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  className="input resize-none h-28"
                  value={form[key] || ''}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              ) : (
                <input
                  type={type}
                  className="input"
                  value={form[key] || ''}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              )}
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {saved && <p className="text-green-600 text-sm mt-4 bg-green-50 px-4 py-3 rounded-lg">Settings saved successfully!</p>}

        <button onClick={handleSave} disabled={saving} className="btn-primary mt-6">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
