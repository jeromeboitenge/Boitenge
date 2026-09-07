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
import { FaArrowLeft, FaUserCog } from 'react-icons/fa';

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
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors mb-2"
                >
                  <FaArrowLeft className="text-xs" /> Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FaUserCog className="text-primary" />
                  </span>
                  <span>Profile</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xl">Management</span>
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Update your photo and CV — they appear instantly on your portfolio.
                </p>
              </div>
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Profile Photo + Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ProfileImageCard />
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Profile photo</h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Click the card or drag & drop an image. JPEG, PNG, WebP, or GIF up to 5MB.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Your new photo previews instantly before it is saved.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Any aspect ratio works; the frame crops beautifully with <span className="font-mono text-xs">object-cover</span>.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Saved automatically and shown on the hero section right away.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CV + Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 lg:order-2">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Curriculum Vitae</h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Upload a PDF or Word document (DOC/DOCX) up to 10MB.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Visitors preview it in the "View CV" modal on your portfolio.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Your uploaded CV replaces the default Google Drive link instantly.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    Use the "Reset to default CV" option whenever you need to.
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:order-1">
              <CvCard />
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}