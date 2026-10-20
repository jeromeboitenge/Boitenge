"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { unifiedApiClient } from "@/lib/unified-api-client";
import type { Experience } from "@/types/content";

const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
  month: 'short',
  year: 'numeric',
});

export default function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setIsLoading(true);
        const data = await unifiedApiClient.getExperience();
        setExperiences(data.sort((a, b) => b.order - a.order));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load experience');
        console.error('Error fetching experience:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperience();
  }, []);
  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl py-8">
        <div className="flex items-center gap-3 py-8 text-sm text-slate-500 dark:text-slate-400" role="status">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-r-transparent" />
          Loading experience
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl py-8" role="alert">
        <p className="border-l-2 border-red-500 pl-4 py-2 text-sm text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-2">
      {experiences.length === 0 ? (
        <p className="py-8 text-sm text-slate-500 dark:text-slate-400">Experience details will appear here soon.</p>
      ) : (
      <div className="relative ml-2 space-y-5 border-l border-slate-200 dark:border-slate-800 sm:ml-3">
        {experiences.map((exp, index) => {
          const period = `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}`;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.24) }}
              viewport={{ once: true }}
              className="relative pl-6 sm:pl-8"
            >
              <span className="absolute -left-[5px] top-5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-lightBg dark:ring-darkBg" aria-hidden="true" />

              <article className="rounded border border-slate-200 bg-white p-4 transition-colors hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-slate-950 dark:text-white">
                      {exp.position}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:pt-1">
                    {period}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {exp.description}
                </p>

                {exp.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.technologies.length > 0 && (
                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Technologies:</span>{' '}
                    {exp.technologies.join(' · ')}
                  </p>
                )}
              </article>
            </motion.div>
          );
        })}
      </div>
      )}
    </div>
  );
}
