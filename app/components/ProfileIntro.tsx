'use client';

import Image from "next/image";
import { motion } from "framer-motion";

const badges = ["Full-stack Engineer", "Design Systems", "Hardware & Software Maintenance"];

export default function ProfileIntro({ showButtons = false }) {
  return (
    <div className="relative pt-20 pb-10 md:py-32 flex flex-col md:flex-row items-center gap-12 md:gap-20">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-[80px] animate-blob" style={{ animationDelay: '2s' }} />
      </div>

      {/* TEXT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-8 text-center md:text-left z-10"
      >
        <div className="inline-flex flex-wrap justify-center gap-3 md:justify-start">
          {badges.map((badge, idx) => (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              key={badge}
              className="rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              {badge}
            </motion.span>
          ))}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400">
            Hello, I am
          </h2>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
            Jerome <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Nzaramyimana</span>
          </h1>
        </div>

        <p className="text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl mx-auto md:mx-0">
          I design and engineer premium digital experiences across React, Next.js, and Node.js—blending product
          thinking with scalable infrastructure so launches feel effortless and polished.
        </p>

        {showButtons && (
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-primary/50">
              Let's build together
            </a>
            <a
              href="/Nzaramyimana-Jerome.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 px-8 py-3.5 text-sm font-semibold text-slate-900 dark:text-white transition-all hover:-translate-y-1 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-sm"
            >
              View Resume
            </a>
          </div>
        )}
      </motion.div>

      {/* IMAGE CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative flex-shrink-0 z-10"
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[3rem] rotate-6 opacity-30 blur-lg animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[3rem] -rotate-3 transition-transform duration-500 hover:rotate-0" />
          
          <div className="absolute inset-1 rounded-[3rem] overflow-hidden bg-slate-900 border-4 border-white dark:border-slate-800">
            <Image
              src="/Nzaramyimana-Jerome.jpeg"
              alt="Jerome Nzaramyimana"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            
            <div className="absolute bottom-4 left-4 right-4 glass px-4 py-2 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white">
                Kigali, Rwanda
              </span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
