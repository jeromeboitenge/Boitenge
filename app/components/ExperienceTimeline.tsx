"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaLaptopCode, FaGraduationCap, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import type { Experience } from "@/types/content";

const iconMap: Record<number, JSX.Element> = {
  0: <FaBriefcase />,
  1: <FaGraduationCap />,
  2: <FaStar />,
  3: <FaLaptopCode />,
};

export default function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getExperience();
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
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Career Journey</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mt-2">
            My Experience
          </h2>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">Career Journey</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mt-2">
            My Experience
          </h2>
        </div>
        <div className="text-center py-20">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Career Journey</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mt-2">
          My Experience
        </h2>
      </motion.div>

      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 md:ml-6 space-y-12">
        {experiences.map((exp, index) => {
          const year = exp.startDate.getFullYear().toString();
          const icon = iconMap[index % Object.keys(iconMap).length];

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-12"
            >
              {/* Glowing Node */}
              <div className="absolute -left-5 top-1 bg-white dark:bg-slate-900 border-4 border-primary w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,98,143,0.4)] z-10">
                <span className="text-primary text-sm">{icon}</span>
              </div>

              <div className="glass-card p-6 md:p-8 rounded-[2rem] group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-primary font-medium mt-1">
                      {exp.position}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-300 w-fit">
                    {year}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                {exp.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.achievements.map((achievement, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
