import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/auth';


interface FormData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
}

const COUNTRIES = ['Nigeria', 'United Kingdom', 'Ghana', 'Kenya', 'South Africa', 'Other'];

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [error, setError] = useState('');
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    try {
      setError('');
      await registerUser(data.name, data.email, data.password, data.phone, data.country);
      navigate('/portal/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src="/logo.jpeg" alt="Agri-Food Innovation Academy" className="h-28 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Create your account</h1>
          <p className="text-gray-500 mt-1">Join AFIA and start learning today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Full Name *</label>
              <input {...register('name', { required: 'Name required' })} className="input" placeholder="Your full name" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label">Email Address *</label>
              <input {...register('email', { required: 'Email required' })} type="email" className="input" placeholder="your@email.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password *</label>
              <input {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 characters' } })} type="password" className="input" placeholder="Min 6 characters" />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
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
            {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-lg">
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
