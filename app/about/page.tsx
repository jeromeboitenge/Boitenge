'use client';

import ProfileIntro from '../components/ProfileIntro';
import ExperienceTimeline from '../components/ExperienceTimeline';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">

      {/* Shared profile intro without buttons */}
      <ProfileIntro showButtons={false} />

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16"
      >
        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          <p>3+ Years of experience in web development, internships, and freelance projects.</p>
        </div>

        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          <p>Bachelor’s in Computer Science from University of Rwanda.</p>
        </div>

        <div className="p-6 bg-lightBg dark:bg-darkText rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Skills Summary</h3>
          <p>Frontend, Backend, Databases, API Integration, Cloud Services.</p>
        </div>
      </motion.div>

      <h2 className="text-3xl font-bold mb-8 text-darkText dark:text-lightBg">My Journey</h2>
      <ExperienceTimeline />
    </section>
  );
}
