'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
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
  const { imageUrl } = useProfileStore();

  return (
    <div className="grid w-full items-center gap-8 py-12 sm:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 order-1 text-left"
      >
        <p className="mb-6 text-sm font-semibold text-primary">
          Software engineer <span className="px-1.5 text-slate-400">/</span> Kigali, Rwanda
        </p>

        <h1 className="max-w-3xl break-words font-display text-4xl font-bold leading-[1.04] text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
          Jerome Nzaramyimana
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
          I build reliable web applications and backend systems for teams and businesses.
        </p>

        {showButtons && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View projects <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            >
              Contact me
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
        className="relative order-2 mx-auto w-full max-w-[16rem] sm:max-w-[19rem] lg:max-w-[23rem]"
      >
        <div className="aspect-square overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-xl shadow-slate-900/15 ring-1 ring-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:ring-slate-700">
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={imageUrl || DEFAULT_PROFILE_IMAGE}
              alt="Portrait of Jerome Nzaramyimana"
              fill
              sizes="(max-width: 640px) 288px, (max-width: 1024px) 352px, 432px"
              className="rounded-full object-cover object-center"
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
