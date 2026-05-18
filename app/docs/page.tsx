'use client';

import Certificates from '@/components/Certificates';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Certificates />
      </main>
      <Footer />
    </div>
  );
}
