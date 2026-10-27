'use client';

import Certificates from '@/components/Certificates';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText">
      <Navbar />
      <main className="site-container site-section">
        <Certificates />
      </main>
      <Footer />
    </div>
  );
}
