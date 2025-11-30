'use client';

import Image from "next/image";
import { motion } from "framer-motion";

const badges = ["Full-stack engineer", "Design systems", "Hardware&software maintanace"];

export default function ProfileIntro({ showButtons = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-start gap-12 rounded-[32px] bg-white/80 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl ring-1 ring-white/70 dark:bg-slate-900/70 dark:ring-slate-800 md:flex-row md:items-start"
    >
      <div className="relative flex-shrink-0">
        <div className="absolute -inset-0.5 rounded-full  from-primary via-accent to-primary blur-2xl opacity-60" />
        <div className="relative h-64 w-64 overflow-hidden rounded-[36px] border border-white/60 bg-slate-900 p-3 shadow-2xl ring-1 ring-white/30 dark:bg-slate-900/90">
          <Image
            src="/Nzaramyimana-Jerome.jpeg"
            alt="Jerome Boitenge"
            fill
            className="rounded-[28px] object-cover"
            priority
          />
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-900">
            Kigali · Remote
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 text-center md:text-left">
        <div className="inline-flex flex-wrap justify-center gap-3 md:justify-start">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
            >
              {badge}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-darkText dark:text-lightBg md:text-5xl">
          Hi, I’m NZARAMYIMANA Jerome
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          I design and engineer premium digital experiences across React, Next.js, and Node.js blending product
          thinking, design systems, and scalable infrastructure so launches feel effortless and polished.
        </p>

        {showButtons && (
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <button className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-primary/90">
              Hire Me
            </button>
            <a
              href="/Nzaramyimana-Jerome.pdf"
              download
              className="inline-flex items-center justify-center rounded-2xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              Download CV
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
