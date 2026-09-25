import ExperienceTimeline from '../components/ExperienceTimeline';
import { FaBriefcase } from 'react-icons/fa';

export default function Experience() {
  return (
    <section id="experience" className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
          <FaBriefcase className="text-xs" />
          Professional Journey
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Experience</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Roles, internships, and milestones that have shaped how I solve problems and ship software.
        </p>
      </div>

      <ExperienceTimeline />
    </section>
  );
}