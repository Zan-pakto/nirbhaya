import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Login successful!');
      
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-6 items-center">
        <div className="hidden lg:block p-8 rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-200 mb-3">Welcome back</p>
          <h1 className="text-4xl font-bold text-white mb-4">Log in to Nirbhaya</h1>
          <p className="text-slate-200/80">
            Access your dashboard, trigger SOS or silent alerts, and manage trusted contacts. Stay ready and keep your circle informed.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-200/80">
            <p>• One-tap SOS and silent alerts</p>
            <p>• Live location sharing</p>
            <p>• Manage trusted contacts anytime</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white text-slate-900 shadow-2xl border border-white/10">
          <div className="mb-6">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 to-orange-400 flex items-center justify-center text-xl font-bold text-white shadow-lg">
              N
            </div>
            <h2 className="text-2xl font-bold mt-4">Sign in</h2>
            <p className="text-sm text-slate-600">Secure access to your safety controls</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300/70 focus:border-orange-300"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300/70 focus:border-orange-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-orange-400 shadow-lg hover:from-primary-600 hover:to-orange-500 transition disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

