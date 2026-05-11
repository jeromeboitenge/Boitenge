/**
 * Login Form Component
 * Provides user interface for authentication
 * Requirements: 1.1, 1.3
 */

'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { LoginCredentials } from '@/types';

interface LoginFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function LoginForm({ onSuccess, className = '' }: LoginFormProps) {
  const { login, isLoading, error } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<LoginCredentials>>({});

  const validateForm = (): boolean => {
    const errors: Partial<LoginCredentials> = {};
    
    if (!credentials.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (credentials.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(credentials);
      onSuccess?.();
    } catch (err) {
      // Error is handled by the auth store
      console.error('Login failed:', err);
    }
  };

  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={credentials.email}
          onChange={handleInputChange('email')}
          className="w-full px-5 py-3 rounded-2xl text-sm bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400"
          placeholder="Enter your email"
          disabled={isLoading}
        />
        {formErrors.email && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={credentials.password}
          onChange={handleInputChange('password')}
          className="w-full px-5 py-3 rounded-2xl text-sm bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400"
          placeholder="Enter your password"
          disabled={isLoading}
        />
        {formErrors.password && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 text-sm font-bold bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-primary/90"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}