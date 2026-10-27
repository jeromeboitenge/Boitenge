'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ArrowUpRight, Moon, Sun } from 'lucide-react';

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Settings</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage your workspace preferences and public details.</p>
      </header>
      <section className="max-w-2xl divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4 p-5">
          <div><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Appearance</h3><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Current theme: {theme || 'system'}</p></div>
          <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Toggle theme</button>
        </div>
        <Link href="/admin/profile" className="flex items-center justify-between gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-800/60"><div><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Public profile</h3><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Update your photo, introduction, and contact details.</p></div><ArrowUpRight size={17} className="text-slate-400" /></Link>
      </section>
    </div>
  );
}