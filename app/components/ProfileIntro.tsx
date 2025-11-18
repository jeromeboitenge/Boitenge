'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProfileIntro({ showButtons = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row items-center gap-12"
    >
      {/* Image */}
      <div className="relative w-60 h-60 md:w-72 md:h-72">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full p-1 animate-pulse"></div>

        <Image
          src="/Nzaramyimana-Jerome.jpeg"
          alt="Jerome Boitenge"
          fill
          className="rounded-full object-cover border-4 border-lightBg dark:border-darkText"
        />
      </div>

      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-darkText dark:text-lightBg">
          Hi, I’m NZARAMYIMANA Jerome
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          I’m a Full-Stack Software Engineer specializing in React, Next.js, Node.js, and modern web
          technologies. I build scalable, elegant, and high-performance digital solutions.
        </p>

        {/* Optional buttons: only show on Hero section */}
        {showButtons && (
          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition">
              Hire Me
            </button>

            <a
              href="/Jerome-Boitenge-CV.pdf"
              download
              className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
            >
              Download CV
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
