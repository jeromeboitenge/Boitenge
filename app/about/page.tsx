'use client';

import { ArrowUpRight, Code2, Database, PanelsTopLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useProfileStore } from '../stores/profileStore';

const focusAreas = [
  {
    icon: PanelsTopLeft,
    title: 'Web & mobile interfaces',
    description: 'Responsive product experiences built with React, Next.js, and React Native.',
  },
  {
    icon: Code2,
    title: 'Backend APIs',
    description: 'Application APIs and server-side workflows using Node.js and NestJS.',
  },
  {
    icon: Database,
    title: 'Data-backed products',
    description: 'Features that connect user workflows to structured application data.',
  },
];

export default function AboutPage() {
  const pathname = usePathname();
  const Heading = pathname === '/about' ? 'h1' : 'h2';
  const { cvUrl } = useProfileStore();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-8"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <header className="max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            About Jerome
          </p>
          <Heading
            id="about-heading"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            I connect useful interfaces with the systems behind them.
          </Heading>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            I’m a software developer based in Kigali, Rwanda. My work spans web and mobile
            applications, backend APIs, and database-backed features. I focus on practical
            workflows: the interface people use, the data it depends on, and how the parts fit
            together.
          </p>
          <a
            href={cvUrl || '/Nzaramyimana-Jerome.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:text-slate-100"
          >
            View my CV <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {focusAreas.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 ${
                index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
