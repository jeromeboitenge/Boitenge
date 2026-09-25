'use client';

import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import ProfileIntro from './ProfileIntro';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-4 md:px-8 relative">
      <div className="mx-auto w-full max-w-7xl">
        <ProfileIntro showButtons={true} />
      </div>

      {/* Scroll-down indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown className="text-lg" />
        </motion.span>
      </motion.a>
    </section>
  );
}