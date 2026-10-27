'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import PageTransition from './PageTransition';

export default function SiteFrame({ children }: { children: ReactNode }) {
  const isAdminRoute = usePathname().startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? 'min-h-screen' : 'min-h-screen pt-20'}>
        {isAdminRoute ? children : <PageTransition>{children}</PageTransition>}
      </main>
      {!isAdminRoute && (
        <>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
}