'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-tr from-primary to-accent p-1">
          <Image
            src="/profile-photo.jpg"
            alt="Jerome Boitenge"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I’m NZARAMYIMANA Jerome
        </h1>
        <p className="text-xl md:text-2xl mb-6">Full-Stack Software Engineer | React, Next.js, Node.js</p>
        <div className="flex justify-center gap-4">
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
      </motion.div>
    </section>
  );
}
