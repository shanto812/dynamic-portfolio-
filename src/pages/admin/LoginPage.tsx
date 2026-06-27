import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Card } from '@/components/common';
import { AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">Admin Panel</h1>
          <p className="text-gray-400">Sign in to manage your portfolio</p>
        </div>

        {/* Login Form */}
        <Card className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg flex gap-3">
              <AlertCircle className="text-danger flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={submitting}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={submitting}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Demo Credentials Notice */}
          <div className="mt-6 p-4 bg-blue-900 bg-opacity-20 border border-blue-700 rounded-lg">
            <p className="text-blue-200 text-xs font-semibold mb-2">Demo Credentials</p>
            <p className="text-blue-100 text-xs">
              Email: <code className="bg-blue-900 px-2 py-1 rounded">admin@example.com</code>
            </p>
            <p className="text-blue-100 text-xs mt-1">
              Password: <code className="bg-blue-900 px-2 py-1 rounded">password123</code>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Portfolio Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
};
