'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings2,
  UserRound,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { User } from '@/types';
import { unifiedApiClient } from '@/lib/unified-api-client';
import { apiClient } from '@/lib/api-client';

type AdminUser = Pick<User, 'name'>;

type CountKey = 'projects' | 'skills' | 'experience' | 'certificates' | 'messages';

const groups: { label: string; links: { label: string; href: string; icon: LucideIcon; countKey?: CountKey }[] }[] = [
  { label: 'Overview', links: [{ label: 'Dashboard', href: '/admin', icon: LayoutDashboard }] },
  {
    label: 'Content',
    links: [
      { label: 'Projects', href: '/admin/projects', icon: FolderKanban, countKey: 'projects' as const },
      { label: 'Skills', href: '/admin/skills', icon: Wrench, countKey: 'skills' as const },
      { label: 'Experience', href: '/admin/experience', icon: BriefcaseBusiness, countKey: 'experience' as const },
      { label: 'Certificates', href: '/admin/certificates', icon: BadgeCheck, countKey: 'certificates' as const },
    ],
  },
  {
    label: 'Profile',
    links: [
      { label: 'Profile & About', href: '/admin/profile', icon: UserRound },
      { label: 'Resume', href: '/admin/resume', icon: FileText },
    ],
  },
  { label: 'Inbox', links: [{ label: 'Messages', href: '/admin/messages', icon: MessageSquare, countKey: 'messages' as const }] },
  { label: 'System', links: [{ label: 'Settings', href: '/admin/settings', icon: Settings2 }] },
];

export default function AdminSidebar({
  user,
  collapsed,
  mobileOpen,
  onToggleCollapsed,
  onCloseMobile,
  onSignOut,
}: {
  user: AdminUser;
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapsed: () => void;
  onCloseMobile: () => void;
  onSignOut: () => void;
}) {
  const pathname = usePathname();
  const [counts, setCounts] = useState({ projects: 0, skills: 0, experience: 0, certificates: 0, messages: 0 });

  useEffect(() => {
    let active = true;
    try {
      const authStorage = localStorage.getItem('auth-storage');
      const token = authStorage ? JSON.parse(authStorage)?.state?.token : null;
      if (token) apiClient.setToken(token);
    } catch {
      // Counts can remain empty if the stored session is unavailable.
    }
    Promise.allSettled([
      unifiedApiClient.getProjects(),
      unifiedApiClient.getSkills(),
      unifiedApiClient.getExperience(),
      unifiedApiClient.getCertificates(),
      apiClient.getMessages(),
    ]).then((results) => {
      if (!active) return;
      setCounts({
        projects: results[0].status === 'fulfilled' ? results[0].value.length : 0,
        skills: results[1].status === 'fulfilled' ? results[1].value.length : 0,
        experience: results[2].status === 'fulfilled' ? results[2].value.length : 0,
        certificates: results[3].status === 'fulfilled' ? results[3].value.length : 0,
        messages: results[4].status === 'fulfilled' ? results[4].value.filter((message) => !message.isRead).length : 0,
      });
    });
    return () => { active = false; };
  }, []);

  const sidebar = (
    <aside className={`fixed inset-y-0 left-0 z-[70] flex w-[260px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 md:translate-x-0 ${collapsed ? 'md:w-[72px]' : ''} ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className={`flex h-[72px] items-center border-b border-slate-100 px-5 dark:border-slate-800 ${collapsed ? 'md:justify-center md:px-2' : 'justify-between'}`}>
        <Link href="/admin" className="flex min-w-0 items-center gap-3" onClick={onCloseMobile} title={collapsed ? 'Portfolio admin' : undefined}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">JB</span>
          <span className={`min-w-0 ${collapsed ? 'md:hidden' : ''}`}>
            <span className="block truncate text-sm font-semibold text-slate-950 dark:text-white">Portfolio</span>
            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">Owner workspace</span>
          </span>
        </Link>
        <button type="button" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden" onClick={onCloseMobile} aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      <div className={`mx-3 mt-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70 ${collapsed ? 'md:justify-center md:px-1' : ''}`} title={collapsed ? user.name : undefined}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{user.name.slice(0, 1).toUpperCase()}</span>
        <span className={`min-w-0 ${collapsed ? 'md:hidden' : ''}`}>
          <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">{user.name}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Owner</span>
        </span>
      </div>

      <nav className="mt-4 flex-1 space-y-5 overflow-y-auto px-3 pb-4" aria-label="Admin navigation">
        {groups.map((group) => (
          <div key={group.label}>
            <p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 ${collapsed ? 'md:hidden' : ''}`}>{group.label}</p>
            <div className="space-y-1">
              {group.links.map(({ label, href, icon: Icon, countKey }) => {
                const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
                const count = countKey ? counts[countKey] : 0;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onCloseMobile}
                    aria-current={active ? 'page' : undefined}
                    title={collapsed ? label : undefined}
                    className={`group relative flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${collapsed ? 'md:justify-center md:px-0' : ''} ${active ? 'bg-primary/10 font-semibold text-primary dark:bg-primary/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`}
                  >
                    {active && <span className="absolute inset-y-2 left-0 w-[3px] rounded-r bg-primary" aria-hidden="true" />}
                    <Icon size={18} className="shrink-0" aria-hidden="true" />
                    <span className={`min-w-0 flex-1 truncate ${collapsed ? 'md:hidden' : ''}`}>{label}</span>
                    {!!count && <span className={`min-w-5 rounded-full bg-slate-100 px-1.5 py-0.5 text-center text-[10px] font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-200 ${collapsed ? 'md:hidden' : ''}`}>{count}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3 dark:border-slate-800">
        <Link href="/" target="_blank" title={collapsed ? 'View site' : undefined} className={`mb-1 flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white ${collapsed ? 'md:justify-center md:px-0' : ''}`}>
          <ExternalLink size={18} aria-hidden="true" />
          <span className={collapsed ? 'md:hidden' : ''}>View site</span>
        </Link>
        <button type="button" onClick={onSignOut} title={collapsed ? 'Sign out' : undefined} className={`flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-300 ${collapsed ? 'md:justify-center md:px-0' : ''}`}>
          <LogOut size={18} aria-hidden="true" />
          <span className={collapsed ? 'md:hidden' : ''}>Sign out</span>
        </button>
        <button type="button" onClick={onToggleCollapsed} className="mt-2 hidden min-h-9 w-full items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-slate-800 dark:hover:text-white md:flex" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {mobileOpen && <button type="button" className="fixed inset-0 z-[60] bg-slate-950/40 md:hidden" aria-label="Close navigation" onClick={onCloseMobile} />}
      {sidebar}
    </>
  );
}