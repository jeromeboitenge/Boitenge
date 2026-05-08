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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.35),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.25),_transparent_40%)]" />
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_420px] items-center">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200/90 shadow-sm shadow-sky-500/20 ring-1 ring-white/10">
                Admin portal
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Secure login for portfolio management
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Access the content editor, manage projects, skills, experience, and certificates from a secure admin dashboard.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/40">
                  <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Email</p>
                  <p className="mt-3 text-base font-medium text-white">admin@portfolio.com</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/40">
                  <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Password</p>
                  <p className="mt-3 text-base font-medium text-white">password123</p>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-10">
              <div className="mb-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">Welcome back</p>
                <h2 className="mt-4 text-3xl font-bold text-white">Sign in to your account</h2>
                <p className="mt-2 text-sm text-slate-400">Use the admin credentials to access the portfolio CMS.</p>
              </div>

              <LoginForm onSuccess={handleLoginSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}