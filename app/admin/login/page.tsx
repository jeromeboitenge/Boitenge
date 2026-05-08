/**
 * Admin Login Page
 * Provides authentication interface for portfolio management
 * Requirements: 1.1, 1.3
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth';
import { useAuth } from '@/components/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleLoginSuccess = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Portfolio Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to manage your portfolio content
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Demo credentials: admin@portfolio.com / password123
          </p>
        </div>
      </div>
    </div>
  );
}