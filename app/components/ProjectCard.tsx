'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- ICON DEFINITIONS (Kept for necessary icons: Spark, External, Check) ---

const IconSpark = () => (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
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

const IconCheck = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path
      d="M4.5 11 8 14.5 15.5 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- TECH ICON DEFINITIONS (All remaining icons kept as before) ---

const iconBase = 'h-3.5 w-3.5 text-primary';

const IconNext = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
    <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
// ... (Include all other Icon components here, or ensure they are present in your file)

const DefaultTechIcon = () => (
  <svg aria-hidden="true" className={iconBase} viewBox="0 0 24 24" fill="none">
    <path d="M5 7.5h14M5 12h14M5 16.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const techIconMap: Record<string, JSX.Element> = {
  // ... (Include all key-value pairs for techIconMap here)
  'Next.js': <IconNext />,
  // ...
};

// --- INTERFACE AND COMPONENT ---

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  highlights: string[];
  demoLink: string;
  codeLink?: string; 
  id?: string | number; 
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  highlights,
  demoLink,
}: ProjectCardProps) {
  const isProd = demoLink.startsWith('https://') && !demoLink.includes('example');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="relative h-full rounded-3xl bg-white p-[1px] shadow-xl dark:shadow-slate-900/40 transition-shadow duration-300 hover:shadow-primary/30 dark:bg-slate-900/50 dark:hover:shadow-primary/20"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[23px] bg-white dark:bg-slate-900/80 ring-1 ring-slate-100 dark:ring-slate-800">
        
        {/* --- IMAGE / HEADER SECTION --- */}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={`${title} mockup`}
            width={640}
            height={200}
            className="h-40 w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/25 to-transparent opacity-80" />
          
          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
              isProd ? 'bg-emerald-500 text-white' : 'bg-primary text-white'
            }`}
          >
            {isProd ? 'LIVE' : 'CONCEPT'}
          </span>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex flex-1 flex-col p-5 gap-4">
          
          {/* Title and Description */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary mb-1">
              <IconSpark />
              Case Study
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
              {description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase text-slate-500 mr-2">Core Stack:</span>
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/80 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {techIconMap[tag] ?? <DefaultTechIcon />}
                {tag}
              </span>
            ))}
          </div>


          {/* Impact Highlights */}
          <div className="flex-1 rounded-xl bg-slate-50/70 p-4 ring-1 ring-slate-100 dark:bg-slate-800/50 dark:ring-slate-700">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              Impact Highlights
            </p>
            <ul className="space-y-2">
              {highlights.slice(0, 2).map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-200">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <IconCheck />
                  </span>
                  <span className="text-xs font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 🎯 ACTION BUTTON (Updated to Gradient Style) */}
          <div className="mt-auto flex pt-2">
            <Link
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              // ⬅️ CRITICAL FIX: Applying Primary-Accent Gradient Style
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.01] hover:opacity-90 shadow-lg shadow-primary/25"
              aria-label={`${title} live demo`}
            >
              Live Demo
              <IconExternal />
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}