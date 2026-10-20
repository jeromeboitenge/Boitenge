'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import Modal from './Modal';
import { useProfileStore } from '../stores/profileStore';

interface ProfileIntroProps {
  showButtons?: boolean;
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/jeromeboitenge', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jerome-aldrin-463b4a411', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:jeromeboitenge@gmail.com', label: 'Email' },
];

export default function ProfileIntro({ showButtons = false }: ProfileIntroProps) {
  const [showCvModal, setShowCvModal] = useState(false);
  const { imageUrl, cvUrl } = useProfileStore();
  const cvEmbedUrl = cvUrl?.includes('/view')
    ? cvUrl.replace(/\/file\/d\/([^/]+)\/view.*$/, '/file/d/$1/preview')
    : cvUrl;

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative z-10 order-2 text-center lg:order-1 lg:text-left"
      >
        <h1 className="font-display text-4xl font-bold leading-[1.08] text-slate-950 dark:text-white sm:text-5xl md:text-6xl">
          Jerome <span className="text-primary">Nzaramyimana</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-100 sm:text-2xl">
          I build thoughtful web products, from the first interface to the systems behind it.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 lg:mx-0">
          I work across React, Next.js, and Node.js to turn complex needs into clear, dependable software.
        </p>

        {showButtons && (
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Explore selected work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setShowCvModal(true)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-slate-300 bg-white/70 px-6 text-sm font-semibold text-slate-800 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
            >
              View résumé <Download size={16} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              title={label}
              className="flex h-11 w-11 items-center justify-center rounded border border-slate-200 bg-white/70 text-slate-600 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          ))}
          <a
            href="/contact"
            className="ml-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary-700"
          >
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
        className="relative order-1 mx-auto w-full max-w-[22rem] sm:max-w-[25rem] lg:order-2 lg:max-w-[28rem]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded border border-slate-200 bg-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <Image
            src={imageUrl}
            alt="Portrait of Jerome Nzaramyimana"
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 400px, 448px"
            className="object-cover"
            priority
          />
        </div>
        <span className="absolute -bottom-7 -left-7 hidden font-display text-7xl font-bold leading-none text-primary/10 lg:block" aria-hidden="true">
          JB
        </span>
      </motion.div>

      <Modal isOpen={showCvModal} onClose={() => setShowCvModal(false)} title="Curriculum Vitae" size="xl">
        <div className="min-h-[60vh] overflow-hidden rounded border border-slate-200 dark:border-slate-800">
          <iframe
            src={cvEmbedUrl}
            title="Curriculum Vitae"
            className="min-h-[60vh] w-full"
            loading="lazy"
          />
        </div>
      </Modal>
    </div>
  );
}
