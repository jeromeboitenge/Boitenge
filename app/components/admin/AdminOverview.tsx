'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Check, FileText, FolderKanban, MessageSquare, Plus, UserRound, Wrench } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useProfileStore } from '@/stores/profileStore';
import type { Certificate, Experience, Message, Project, Skill } from '@/types';

type AnalyticsSummary = ReturnType<typeof analytics.getAnalytics>;

export default function AdminOverview({
  userName,
  projects,
  skills,
  experiences,
  certificates,
  messages,
  quickStats,
}: {
  userName: string;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certificates: Certificate[];
  messages: Message[];
  quickStats: { totalMessages: number; unreadMessages: number; recentMessages: number; responseRate: number };
}) {
  const { imageUrl, cvUrl } = useProfileStore();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    setAnalyticsData(analytics.getAnalytics());
  }, []);

  const dailyViews = analyticsData?.dailyViews ?? [];
  const checklist = [
    { label: 'Profile photo', complete: Boolean(imageUrl), href: '/admin/profile', icon: UserRound },
    { label: 'Three projects published', complete: projects.filter((project) => project.isPublished).length >= 3, href: '/admin/projects?create=1', icon: FolderKanban },
    { label: 'Resume linked', complete: Boolean(cvUrl), href: '/admin/resume', icon: FileText },
    { label: 'Certificate added', complete: certificates.length > 0, href: '/admin/certificates?create=1', icon: BadgeCheck },
  ];
  const completion = Math.round((checklist.filter((item) => item.complete).length / checklist.length) * 100);
  const unreadMessages = useMemo(() => messages.filter((message) => !message.isRead).slice(0, 4), [messages]);

  const metrics = [
    { label: 'Projects', value: projects.length, caption: `${projects.filter((project) => project.isPublished).length} published`, icon: FolderKanban },
    { label: 'Skills', value: skills.length, caption: `${new Set(skills.map((skill) => skill.category)).size} categories`, icon: Wrench },
    { label: 'Unread messages', value: quickStats.unreadMessages, caption: `${quickStats.totalMessages} total received`, icon: MessageSquare },
    { label: 'Portfolio views', value: analyticsData?.totalViews ?? 0, caption: 'Total tracked page views', icon: BriefcaseBusiness },
    { label: 'Visits · 24h', value: analyticsData?.recentViews ?? 0, caption: 'Page views in the last day', icon: Activity },
    { label: 'Response rate', value: `${quickStats.responseRate}%`, caption: 'Messages already read', icon: Check },
  ];

  const dateLabel = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{dateLabel}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Welcome back, {userName}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Here’s what’s happening with your portfolio.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/projects?create=1" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"><Plus size={16} /> Add project</Link>
          <Link href="/admin/skills?create=1" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"><Plus size={16} /> Add skill</Link>
          <Link href="/admin/messages" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-700 dark:text-slate-200"><MessageSquare size={16} /> Messages</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6" aria-label="Portfolio overview">
        {metrics.map(({ label, value, caption, icon: Icon }) => (
          <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p><p className="mt-2 text-3xl font-semibold tabular-nums text-slate-950 dark:text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p></div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20"><Icon size={18} /></span>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{caption}</p>
          </article>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 xl:col-span-7" aria-labelledby="traffic-heading">
          <div className="flex items-start justify-between gap-3">
            <div><h3 id="traffic-heading" className="text-sm font-semibold text-slate-950 dark:text-white">Portfolio traffic</h3><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Daily page views · last 30 days</p></div>
            <span className="text-lg font-semibold tabular-nums text-slate-950 dark:text-white">{analyticsData?.totalViews.toLocaleString() ?? '—'}</span>
          </div>
          {dailyViews.length ? (
            <div className="mt-5 h-56 w-full" role="img" aria-label="Area chart showing portfolio views over the last seven days">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyViews} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                  <defs><linearGradient id="admin-views-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0B5C80" stopOpacity={0.22} /><stop offset="95%" stopColor="#0B5C80" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid vertical={false} stroke="currentColor" strokeOpacity={0.08} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#cbd5e1', fontSize: 12 }} />
                  <Area type="monotone" dataKey="count" stroke="#0B5C80" strokeWidth={2} fill="url(#admin-views-fill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : <div className="mt-5 flex h-56 items-center justify-center rounded-lg bg-slate-50 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">Traffic data will appear as visitors browse.</div>}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 xl:col-span-5" aria-labelledby="messages-heading">
          <div className="flex items-center justify-between gap-3"><div><h3 id="messages-heading" className="text-sm font-semibold text-slate-950 dark:text-white">Recent inbox</h3><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{quickStats.unreadMessages} unread</p></div><Link href="/admin/messages" className="text-xs font-semibold text-primary hover:underline">Open inbox</Link></div>
          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
            {unreadMessages.length ? unreadMessages.map((message) => (
              <article key={message.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-900 dark:text-white">{message.name}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{message.message}</p><time className="mt-1 block text-[11px] text-slate-400">{new Date(message.createdAt).toLocaleString()}</time></div>
                <a href={`mailto:${message.email}`} className="mt-0.5 text-xs font-semibold text-primary hover:underline">Reply</a>
              </article>
            )) : <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">Your inbox is clear.</p>}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 xl:col-span-7" aria-labelledby="activity-heading">
          <div className="flex items-center justify-between"><div><h3 id="activity-heading" className="text-sm font-semibold text-slate-950 dark:text-white">Recent activity</h3><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Latest tracked portfolio events</p></div><Link href="/admin/settings" className="text-xs font-semibold text-primary hover:underline">Analytics settings</Link></div>
          <div className="mt-4 space-y-3">
            {analyticsData?.recentEvents.slice(0, 5).map((event, index) => <div key={`${event.timestamp}-${index}`} className="flex items-center gap-3"><span className="h-2 w-2 shrink-0 rounded-full bg-primary/60" /><p className="min-w-0 flex-1 truncate text-sm text-slate-700 dark:text-slate-300">{event.projectName ? `Viewed ${event.projectName}` : event.page ? `Visited ${event.page}` : event.type.replaceAll('_', ' ')}</p><time className="shrink-0 text-xs text-slate-400">{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time></div>)}
            {!analyticsData?.recentEvents.length && <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">Activity will appear here as your portfolio is visited.</p>}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 xl:col-span-5" aria-labelledby="completion-heading">
          <div className="flex items-start justify-between gap-3"><div><h3 id="completion-heading" className="text-sm font-semibold text-slate-950 dark:text-white">Portfolio completeness</h3><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">A few basics help visitors get a fuller picture.</p></div><span className="text-sm font-semibold text-primary">{completion}%</span></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-primary transition-[width] duration-200" style={{ width: `${completion}%` }} /></div>
          <ul className="mt-4 space-y-1">
            {checklist.map(({ label, complete, href, icon: Icon }) => <li key={label}><Link href={href} className="flex min-h-10 items-center gap-3 rounded-lg px-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"><Icon size={16} className={complete ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'} /><span className={`flex-1 ${complete ? 'text-slate-500 line-through dark:text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>{label}</span>{complete ? <Check size={16} className="text-emerald-600 dark:text-emerald-400" /> : <ArrowUpRight size={15} className="text-slate-400" />}</Link></li>)}
          </ul>
        </section>
      </div>
      <span className="sr-only">{experiences.length} experiences available.</span>
    </div>
  );
}