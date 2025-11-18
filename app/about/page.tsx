'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ExperienceTimeline from '../components/ExperienceTimeline';

export default function About() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center gap-12 mb-16"
      >
        <div className="relative w-60 h-60 md:w-72 md:h-72">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full p-1 animate-pulse"></div>
          <Image
            src="/Nzaramyimana-Jerome.jpeg"
            alt="Jerome Boitenge"
            fill
            className="rounded-full object-cover border-4 border-lightBg dark:border-darkText"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 text-darkText dark:text-lightBg">
            Hi, I’m Jerome Boitenge
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            I’m a Full-Stack Software Engineer passionate about building elegant and scalable web
            applications. I specialize in React, Next.js, Node.js, and modern web technologies. I
            love turning complex problems into simple, functional solutions.
          </p>
        </div>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          <p>3+ Years of experience in web development, internships, freelance projects.</p>
        </div>
        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          <p>Bachelor’s in Computer Science from University of Rwanda.</p>
        </div>
        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Skills Summary</h3>
          <p>Frontend, Backend, Databases, Tools, API Integration, Cloud Services.</p>
        </div>
      </motion.div>

      {/* Timeline */}
      <h2 className="text-3xl font-bold mb-8 text-darkText dark:text-lightBg">My Journey</h2>
      <ExperienceTimeline />
    </section>
  );
}
