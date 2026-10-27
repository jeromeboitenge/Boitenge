'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
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

export default function ProfileIntro({ showButtons = false }: ProfileIntroProps) {
  const { imageUrl, cvUrl } = useProfileStore();

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 order-1 text-left"
      >
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Software developer <span className="px-1 text-slate-400" aria-hidden="true">/</span> Kigali, Rwanda
        </p>
        <h1 className="max-w-3xl break-words font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
          Jerome <span className="text-primary">Nzaramyimana</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-100 sm:text-2xl">
          I build web and mobile applications, from the interface to the systems behind it.
        </p>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          My work spans React and Next.js interfaces, Node.js APIs, and database-backed products.
          Explore selected projects, the technologies behind them, and ways to get in touch.
        </p>

        {showButtons && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View selected work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-5 text-sm font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            >
              Contact me
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
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white/70 text-slate-600 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
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
        className="relative order-2 mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10 sm:max-w-[19rem] lg:max-w-[24rem] dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/20"
      >
        <Image
          src={imageUrl || DEFAULT_PROFILE_IMAGE}
          alt="Portrait of Jerome Nzaramyimana"
          fill
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 304px, 384px"
          className="object-cover object-center"
          priority
        />
      </motion.div>
    </div>
  );
}
