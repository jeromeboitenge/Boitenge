'use client';

import { ArrowUpRight, Code2, Database, PanelsTopLeft, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useProfileStore } from '../stores/profileStore';

const focusAreas = [
  {
    icon: PanelsTopLeft,
    title: 'Product interfaces',
    description: 'Responsive experiences built for clarity, speed, and real user needs.',
  },
  {
    icon: Code2,
    title: 'Backend engineering',
    description: 'Application APIs, server workflows, and integrations that keep systems reliable.',
  },
  {
    icon: Database,
    title: 'Data and operations',
    description: 'Database-backed features, process automation, and the logic behind day-to-day work.',
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
      className="site-container site-section"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <header className="max-w-xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            <Sparkles size={12} aria-hidden="true" />
            About Jerome
          </p>
          <Heading
            id="about-heading"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            I turn product ideas into durable software that people can actually use.
          </Heading>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            I’m a software developer based in Kigali, Rwanda, and I work across the full product
            lifecycle: understanding the problem, designing a sensible experience, building the
            underlying system, and making sure it stays maintainable as it grows.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            My work blends thoughtful UX, clean architecture, and practical engineering. I care
            about how software behaves in real life, not just how it looks in a prototype.
          </p>
          <a
            href={cvUrl || '/Nzaramyimana-Jerome.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
          >
            View my CV <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className={`rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 sm:p-6 ${
                index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner shadow-primary/10">
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
