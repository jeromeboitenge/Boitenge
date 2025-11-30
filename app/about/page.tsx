'use client';

import ExperienceTimeline from "../components/ExperienceTimeline";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">

      {/* Focus narrative */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl bg-white/90 p-10 shadow-xl ring-1 ring-slate-100 dark:bg-slate-900/70 dark:ring-slate-800"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary">
          About Jerome
        </p>
        <h1 className="mt-4 text-3xl font-bold text-darkText dark:text-lightBg">
          Engineering premium digital experiences with product empathy.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          I help founders and teams ship elegant, measurable software. My work blends strategy, design systems,
          and resilient full-stack engineering so every feature feels intentional and performant. Instead of repeating
          the hero introduction, this section dives deeper into how I collaborate, mentor teams, and champion user-centric delivery.
        </p>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 gap-8 my-16 md:grid-cols-3"
      >
        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          <p>3+ years delivering SaaS and platform projects from discovery through launch.</p>
        </div>

        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          <p>Bachelor’s in Computer Science  University of Rwanda, specializing in software systems.</p>
        </div>

        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Focus Areas</h3>
          <p>Design systems, full-stack architecture, DevOps automation, and data-informed UX.</p>
        </div>
      </motion.div>

      <h2 className="text-3xl font-bold mb-8 text-darkText dark:text-lightBg">
        My Journey
      </h2>
      <ExperienceTimeline />
    </section>
  );
}
