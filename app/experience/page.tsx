import ExperienceTimeline from '../components/ExperienceTimeline';

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8 md:py-20">
      <header className="mb-8 max-w-3xl border-b border-slate-200 pb-6 dark:border-slate-800">
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
          Experience
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
          Roles and projects that have shaped how I build, collaborate, and deliver software.
        </p>
      </header>

      <ExperienceTimeline />
    </section>
  );
}