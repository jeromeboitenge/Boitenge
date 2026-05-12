'use client';

import Certificates from '@/components/Certificates';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-sm ring-1 ring-primary/20">
            Professional Credentials
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Certifications & Credentials
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Verified professional certifications and technical credentials demonstrating expertise across various technologies and platforms.
          </p>
        </div>
        <Certificates />
      </main>
      <Footer />
    </div>
  );
}
