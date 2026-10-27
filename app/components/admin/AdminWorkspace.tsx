'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/components/auth';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminWorkspace({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (isLoading) return;
    if (!isAuthenticated || !user) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
    } else if (user.role !== 'owner') {
      router.replace('/admin/login?reason=owner-required');
    }
  }, [isAuthenticated, isLoading, pathname, router, user]);

  const isOwner = isAuthenticated && user?.role === 'owner';

  if (pathname === '/admin/login') return <>{children}</>;

  if (isLoading || !isOwner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950" role="status" aria-label="Checking owner access">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <AdminSidebar
        user={user}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
        onCloseMobile={() => setMobileOpen(false)}
        onSignOut={async () => {
          await logout();
          router.replace('/admin/login');
        }}
      />
      <div className={`min-h-screen transition-[padding] duration-200 ${collapsed ? 'md:pl-[72px]' : 'md:pl-[260px]'}`}>
        <AdminTopbar
          user={user}
          onOpenSidebar={() => setMobileOpen(true)}
          onSignOut={async () => {
            await logout();
            router.replace('/admin/login');
          }}
        />
        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </div>
  );
}