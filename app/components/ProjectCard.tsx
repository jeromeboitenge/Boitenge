'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const IconSpark = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    className="text-primary"
  >
    <path
      d="M12 3v4m0 10v4m7-7h-4m-6 0H5m10.95-5.95-2.83 2.83m-3.302 3.302-2.83 2.83m0-8.962 2.83 2.83m3.302 3.302 2.83 2.83"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconExternal = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.25 3.75H16.25M16.25 3.75V8.75M16.25 3.75L10 10M11.25 8.75H6.25C5.55964 8.75 5 9.30964 5 10V15C5 15.6904 5.55964 16.25 6.25 16.25H11.25C11.9404 16.25 12.5 15.6904 12.5 15V9.375"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCode = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path
      d="M6.25 6.25 3.75 10l2.5 3.75M13.75 13.75 16.25 10l-2.5-3.75M11.25 3.75l-2.5 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCheck = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path
      d="M4.5 11 8 14.5 15.5 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconBase = 'h-4 w-4 text-primary';

const IconNext = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
    <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconReact = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.3" />
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.3" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.3" transform="rotate(-60 12 12)" />
  </svg>
);

const IconPrisma = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M7 19l4-14 6 9-5 5z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
  </svg>
);

const IconMongo = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M12 3s4 4 4 9-4 9-4 9-4-4-4-9 4-9 4-9z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const IconTailwind = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 14c1.5-3 3.5-4 6-2 2.5 2 4.5 1 6-2 1.5-3 3.5-4 6-2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M1 18c1.5-3 3.5-4 6-2 2.5 2 4.5 1 6-2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const IconMapbox = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M12 4l6 6-6 10-6-10 6-6z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="10" r="2" fill="currentColor" />
  </svg>
);

const IconSupabase = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M7 3l10 10h-6l6 8-10-10h6z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
  </svg>
);

const IconTypeScript = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 9h6m-3 0v8m0 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconTensorFlow = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M5 9l7-4 7 4-7 4-7-4zm7 4v8m0-8 7-4m-7 4-7-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const IconRedis = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="7" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 7v6c0 1.7 3.1 3 7 3s7-1.3 7-3V7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconNest = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M5 12c0-4 3-7 7-7s7 3 7 7-3 7-7 7c-1.5 0-2.5-.5-3.5-1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconPostgres = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M8 8c0-3 1.5-5 4-5s4 2 4 5v6c0 3-1.5 5-4 5s-4-2-4-5V8z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 11H5v2c0 2 1.5 3 3 3h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 11h3v2c0 2-1.5 3-3 3h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconStripe = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path
      d="M6 15c1 1 2.5 2 5 2s4-1 4-2-1.5-2-4-2-4-1-4-2 1.7-2 4-2 3.5.8 4.5 1.8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconWebRTC = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="6" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="6" cy="16" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="18" cy="16" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M8 9l3 2m5-2-3 2m3 4-3-2m-5 2 3-2" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconNode = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M12 3l8 4.5v9L12 21 4 16.5v-9L12 3z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const DefaultTechIcon = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M5 7.5h14M5 12h14M5 16.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const techIconMap: Record<string, JSX.Element> = {
  'Next.js': <IconNext />,
  React: <IconReact />,
  Prisma: <IconPrisma />,
  MongoDB: <IconMongo />,
  'Tailwind CSS': <IconTailwind />,
  Mapbox: <IconMapbox />,
  Supabase: <IconSupabase />,
  TypeScript: <IconTypeScript />,
  TensorFlow: <IconTensorFlow />,
  Redis: <IconRedis />,
  NestJS: <IconNest />,
  PostgreSQL: <IconPostgres />,
  Stripe: <IconStripe />,
  WebRTC: <IconWebRTC />,
  'Node.js': <IconNode />,
};

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  highlights: string[];
  demoLink: string;
  codeLink: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  highlights,
  demoLink,
  codeLink,
}: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isProd = demoLink.startsWith('https://') && !demoLink.includes('example');
  const stackSummary = tags.slice(0, 3).join(' • ');

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative h-full rounded-[28px] bg-gradient-to-br from-white via-primary/30 to-white/30 p-[1px] shadow-[0_35px_90px_rgba(14,34,78,0.18)] transition duration-500 ${
        isVisible ? 'opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[27px] bg-white/95 backdrop-blur-xl ring-1 ring-white/60 dark:bg-slate-900/80 dark:ring-slate-800">
        <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={`${title} mockup`}
          width={640}
          height={360}
          className="h-56 w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          priority={false}
        />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/25 to-transparent opacity-80" />
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-[0.3em] text-slate-900 shadow-lg">
            <IconSpark />
            Build
          </div>
          <span
            className={`absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${
              isProd ? 'bg-emerald-400/90 text-white' : 'bg-slate-900/80 text-white'
            }`}
          >
            {isProd ? 'Live' : 'Concept'}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <IconSpark />
              Case Study
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.35em] text-slate-400">
                <span>Product</span>
                <span>{stackSummary}</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
            </div>
            <p className="text-base text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
              >
                {techIconMap[tag] ?? <DefaultTechIcon />}
                {tag}
              </span>
            ))}
          </div>

          <div className="rounded-3xl bg-white/90 p-5 ring-1 ring-slate-100 shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:bg-slate-900/60 dark:ring-slate-800">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Impact Highlights
            </p>
            <ul className="space-y-3">
              {highlights.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-200">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <IconCheck />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            <Link
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-white dark:text-slate-900"
              aria-label={`${title} live demo`}
            >
              Live Demo
              <IconExternal />
            </Link>
            <Link
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300/80 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 dark:border-slate-600 dark:text-slate-100"
              aria-label={`${title} source code`}
            >
              Source Code
              <IconCode />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

