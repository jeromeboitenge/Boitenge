/**
 * Admin Profile Page
 * Dedicated page for the owner to manage their profile photo and CV
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth';
import ProfileImageCard from '@/components/ProfileImageCard';
import CvCard from '@/components/CvCard';
import { FaArrowLeft, FaExternalLinkAlt, FaUserCog } from 'react-icons/fa';

export default function AdminProfilePage() {
  return (
    <AuthGuard
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">Please log in to access this content.</p>
          <Link
            href="/admin/login"
            className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      }
    >
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-center gap-5 py-6">
              <div>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                >
                  <FaArrowLeft className="text-xs" /> Dashboard
                </Link>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaUserCog />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Portfolio settings</p>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile assets</h1>
                  </div>
                </div>
              </div>
              <Link href="/" target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
                View portfolio <FaExternalLinkAlt className="text-xs" />
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Public profile</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage the photo and CV shown to visitors.</p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Updates publish immediately</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ProfileImageCard />
            <CvCard />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}