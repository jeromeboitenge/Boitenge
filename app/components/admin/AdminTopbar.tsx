'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ArrowUpRight, Bell, Command, Menu, Moon, Search, Sun, X } from 'lucide-react';
import type { User } from '@/types';
import { unifiedApiClient } from '@/lib/unified-api-client';
import { apiClient } from '@/lib/api-client';

const routeNames: Record<string, string> = {
  admin: 'Dashboard',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  certificates: 'Certificates',
  profile: 'Profile & About',
  resume: 'Resume',
  messages: 'Messages',
  settings: 'Settings',
};

const destinations = [
  { label: 'Dashboard overview', href: '/admin', type: 'Overview' },
  { label: 'Manage projects', href: '/admin/projects', type: 'Content' },
  { label: 'Manage skills', href: '/admin/skills', type: 'Content' },
  { label: 'Manage experience', href: '/admin/experience', type: 'Content' },
  { label: 'Manage certificates', href: '/admin/certificates', type: 'Content' },
  { label: 'Edit public profile', href: '/admin/profile', type: 'Profile' },
  { label: 'Manage resume', href: '/admin/resume', type: 'Profile' },
  { label: 'Open inbox', href: '/admin/messages', type: 'Inbox' },
  { label: 'Settings', href: '/admin/settings', type: 'System' },
];

export default function AdminTopbar({
  user,
  onOpenSidebar,
  onSignOut,
}: {
  user: Pick<User, 'name'>;
  onOpenSidebar: () => void;
  onSignOut: () => void;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchItems, setSearchItems] = useState(destinations);
  const currentLabel = pathname.split('/').filter(Boolean).map((part) => routeNames[part] || part).at(-1) || 'Dashboard';
  const crumbs = pathname.split('/').filter(Boolean).slice(1).map((part) => routeNames[part] || part);
  const filteredDestinations = useMemo(() => searchItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())), [query, searchItems]);

  useEffect(() => {
    setMounted(true);
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    let active = true;
    try {
      const authStorage = localStorage.getItem('auth-storage');
      const token = authStorage ? JSON.parse(authStorage)?.state?.token : null;
      if (token) apiClient.setToken(token);
    } catch {
      // Keep navigation commands available if stored search data is unavailable.
    }
    Promise.allSettled([
      unifiedApiClient.getProjects(),
      unifiedApiClient.getSkills(),
      apiClient.getMessages(),
    ]).then(([projects, skills, messages]) => {
      if (!active) return;
      const records = [
        ...(projects.status === 'fulfilled' ? projects.value.map((project) => ({ label: project.title, href: `/admin/projects?q=${encodeURIComponent(project.title)}`, type: 'Project' })) : []),
        ...(skills.status === 'fulfilled' ? skills.value.map((skill) => ({ label: skill.name, href: `/admin/skills?q=${encodeURIComponent(skill.name)}`, type: 'Skill' })) : []),
        ...(messages.status === 'fulfilled' ? messages.value.map((message) => ({ label: message.name, href: `/admin/messages?q=${encodeURIComponent(message.name)}`, type: 'Message' })) : []),
      ];
      setSearchItems([...destinations, ...records]);
    });
    return () => { active = false; };
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" onClick={onOpenSidebar} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-300 dark:hover:bg-slate-800 md:hidden" aria-label="Open navigation"><Menu size={19} /></button>
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-0.5 hidden items-center gap-1.5 text-[11px] text-slate-500 sm:flex">
              <Link href="/admin" className="hover:text-primary">Admin</Link>
              {crumbs.map((crumb, index) => <span key={`${crumb}-${index}`} className="flex items-center gap-1.5"><span aria-hidden="true">/</span><span>{crumb}</span></span>)}
            </nav>
            <h1 className="truncate text-base font-semibold text-slate-950 dark:text-white sm:text-lg">{currentLabel}</h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-2.5 text-sm text-slate-500 transition-colors hover:border-primary/40 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:text-slate-300 dark:hover:text-white sm:px-3" aria-label="Search admin pages">
            <Search size={16} /><span className="hidden lg:inline">Search</span><kbd className="hidden rounded border border-slate-200 px-1 text-[10px] dark:border-slate-700 sm:inline-flex"><Command size={10} /> K</kbd>
          </button>
          <Link href="/admin/messages" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Notifications and messages"><Bell size={17} /></Link>
          <button type="button" onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Toggle color theme">{mounted && theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
          <Link href="/" target="_blank" className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:text-slate-200 dark:hover:text-white sm:inline-flex">View site <ArrowUpRight size={14} /></Link>
          <div className="relative">
            <button type="button" onClick={() => setUserMenuOpen((value) => !value)} className="flex h-9 items-center gap-2 rounded-lg px-1.5 text-left hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-slate-800" aria-expanded={userMenuOpen} aria-label="Open owner menu">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{user.name.slice(0, 1).toUpperCase()}</span>
              <span className="hidden max-w-28 truncate text-xs font-medium text-slate-700 dark:text-slate-200 lg:block">{user.name}</span>
            </button>
            {userMenuOpen && <div className="absolute right-0 top-11 z-50 w-52 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"><div className="flex items-center justify-between gap-2 px-3 py-2"><span className="max-w-32 truncate text-xs text-slate-600 dark:text-slate-300">{user.name}</span><span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">Owner</span></div><Link href="/admin/profile" onClick={() => setUserMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Profile</Link><button type="button" onClick={onSignOut} className="w-full rounded-md px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30">Sign out</button></div>}
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center bg-slate-950/45 px-4 pt-[12vh]" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-label="Admin command palette" className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800"><Search size={17} className="text-slate-400" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Jump to a section…" className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" /><button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={16} /></button></div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filteredDestinations.map((destination) => <Link key={destination.href} href={destination.href} onClick={() => { setSearchOpen(false); setQuery(''); }} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary dark:text-slate-200 dark:hover:bg-primary/20"><span>{destination.label}</span><span className="text-xs text-slate-400">{destination.type}</span></Link>)}
              {filteredDestinations.length === 0 && <p className="px-3 py-8 text-center text-sm text-slate-500">No matching sections.</p>}
            </div>
            <footer className="flex items-center gap-2 border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400 dark:border-slate-800"><span>Enter to open</span><span>Esc to close</span></footer>
          </section>
        </div>
      )}
    </>
  );
}