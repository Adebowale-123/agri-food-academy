import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/auth';
import api from '../../services/api';

interface FormData {
  name: string;
  phone?: string;
  country?: string;
  password?: string;
}

const COUNTRIES = ['Nigeria', 'United Kingdom', 'Ghana', 'Kenya', 'South Africa', 'Other'];

export default function Profile() {
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: { name: user?.name || '', phone: user?.phone || '', country: user?.country || '' },
  });

  async function onSubmit(data: FormData) {
    try {
      setError('');
      await api.put('/auth/me', data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Failed to update profile. Please try again.');
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-surface">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">My Profile</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <span className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full font-medium capitalize">{user?.role}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label">Full Name</label>
              <input {...register('name', { required: true })} className="input" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Phone</label>
                <input {...register('phone')} className="input" placeholder="+234..." />
              </div>
              <div>
                <label className="label">Country</label>
                <select {...register('country')} className="input bg-white">
                  <option value="">Select...</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label">New Password (leave blank to keep current)</label>
              <input {...register('password')} type="password" className="input" placeholder="••••••••" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {saved && <p className="text-green-600 text-sm bg-green-50 px-4 py-3 rounded-lg">Profile updated successfully!</p>}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
