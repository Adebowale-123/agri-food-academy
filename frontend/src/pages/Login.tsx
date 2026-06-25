import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/auth';


interface FormData { email: string; password: string; }

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    try {
      setError('');
      await login(data.email, data.password);
      navigate(isAdmin() ? '/admin/dashboard' : '/portal/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src="/logo.jpeg" alt="Agri-Food Innovation Academy" className="h-28 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Welcome back</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                {...register('email', { required: 'Email required' })}
                type="email"
                className="input"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password</label>
              <input
                {...register('password', { required: 'Password required' })}
                type="password"
                className="input"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-lg">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">Register free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
