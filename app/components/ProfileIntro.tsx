'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { useProfileStore } from '../stores/profileStore';

const DEFAULT_PROFILE_IMAGE = '/Nzaramyimana-Jerome.jpeg';

interface ProfileIntroProps {
  showButtons?: boolean;
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/jeromeboitenge', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jerome-aldrin-463b4a411', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:jeromeboitenge@gmail.com', label: 'Email' },
];

const capabilityHighlights = [
  { icon: Code2, label: 'Frontend', value: 'React + Next.js' },
  { icon: Workflow, label: 'Systems', value: 'APIs + workflows' },
  { icon: Database, label: 'Data', value: 'PostgreSQL + Prisma' },
];

const stackPills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma'];

export default function ProfileIntro({ showButtons = false }: ProfileIntroProps) {
  const { imageUrl, cvUrl } = useProfileStore();

  return (
    <div className="grid w-full items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 order-1 text-left"
      >
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          <Sparkles size={12} aria-hidden="true" />
          Full-stack software developer · Kigali, Rwanda
        </p>

        <h1 className="max-w-3xl break-words font-display text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
          I build digital products that bring ideas into reliable, working software.
        </h1>

        <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-100 sm:text-2xl">
          I design and build practical web applications, API systems, and data-driven workflows that solve real business problems.
        </p>

        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          My work spans product interfaces, backend architecture, database design, and deployment-ready implementations with a focus on usability, maintainability, and performance.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {stackPills.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        {showButtons && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-[0_18px_38px_-18px_rgba(0,98,139,0.85)] transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View selected work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 text-sm font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            >
              Contact me
            </a>
            <a
              href="https://github.com/jeromeboitenge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 text-sm font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            >
              View GitHub
            </a>
            <a
              href={cvUrl || '/Nzaramyimana-Jerome.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-1 px-2 text-sm font-semibold text-primary transition hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View CV <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}

        <nav className="mt-8 flex items-center gap-3" aria-label="Social profiles">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              title={label}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        className="relative order-2 mx-auto w-full max-w-[15rem] sm:max-w-[19rem] lg:max-w-[24rem]"
      >
        <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-cyan-400/10 to-transparent blur-2xl dark:from-primary/25" />

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-black/30">
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={imageUrl || DEFAULT_PROFILE_IMAGE}
                alt="Portrait of Jerome Nzaramyimana"
                fill
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 304px, 384px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {capabilityHighlights.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left dark:border-slate-700 dark:bg-slate-800/80"
              >
                <Icon size={16} className="text-primary" aria-hidden="true" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
