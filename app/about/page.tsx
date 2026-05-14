'use client';

import ExperienceTimeline from "../components/ExperienceTimeline";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const MotionDiv = mounted ? motion.div : 'div';

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">

      {/* Focus narrative */}
      <MotionDiv
        {...(mounted ? {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7 }
        } : {})}
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
      </MotionDiv>

      <h2 className="text-3xl font-bold mb-8 mt-16 text-darkText dark:text-lightBg">
        My Journey
      </h2>
      <ExperienceTimeline />
    </section>
  );
}
