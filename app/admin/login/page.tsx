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
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText transition-colors duration-300">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 dark:from-primary/20 dark:to-accent/20" />
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_420px] items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-sm ring-1 ring-primary/20">
                Admin portal
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Secure login for portfolio management
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Access the content editor, manage projects, skills, experience, and certificates from a secure admin dashboard.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-5 shadow-xl">
                  <p className="text-sm uppercase tracking-[0.25em] text-primary">Email</p>
                  <p className="mt-3 text-base font-medium text-slate-900 dark:text-white">admin@portfolio.com</p>
                </div>
                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-5 shadow-xl">
                  <p className="text-sm uppercase tracking-[0.25em] text-primary">Password</p>
                  <p className="mt-3 text-base font-medium text-slate-900 dark:text-white">password123</p>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 shadow-2xl sm:p-10">
              <div className="mb-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">Welcome back</p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Sign in to your account</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Use the admin credentials to access the portfolio CMS.</p>
              </div>

              <LoginForm onSuccess={handleLoginSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}