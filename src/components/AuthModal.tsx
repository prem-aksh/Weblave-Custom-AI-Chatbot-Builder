import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-custom-dark/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-custom-medium hover:text-custom-dark"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-custom-dark">
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="mb-4">
              <label className="block text-custom-dark text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-custom-medium"
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-custom-dark text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-custom-medium"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-custom-dark text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-custom-medium"
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-custom-medium text-white py-2 px-4 rounded hover:bg-custom-dark disabled:opacity-50"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}