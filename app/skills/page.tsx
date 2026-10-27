"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SkillCard from "../components/SkillCard";
import { PORTFOLIO_DATA_UPDATED_EVENT, unifiedApiClient } from "@/lib/unified-api-client";
import { Skill } from "@/types";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend & APIs",
  database: "Databases",
  mobile: "Mobile",
  tools: "Developer tools",
  "data science": "Data & machine learning",
  "embeded system": "Embedded systems",
  "embedded system": "Embedded systems",
  other: "Other skills",
};

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [skills, setSkills] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchSkills = async (showLoading: boolean) => {
      try {
        if (showLoading) setIsLoading(true);
        const data = await unifiedApiClient.getSkills();
        if (!isMounted) return;
        
        const grouped = data.reduce((acc, skill) => {
          const normalizedCategory = skill.category.trim().toLowerCase();
          const category = categoryLabels[normalizedCategory] ?? normalizedCategory
            .split(/\s+/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          if (!acc[category]) {
            acc[category] = [];
          }
          if (!acc[category].some((name) => name.toLowerCase() === skill.name.trim().toLowerCase())) {
            acc[category].push(skill.name.trim());
          }
          return acc;
        }, {} as Record<string, string[]>);
        
        setSkills(grouped);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        console.error('Failed to fetch skills:', err);
        setError('Failed to load skills. Showing cached data.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const refreshSkills = () => void fetchSkills(false);
    void fetchSkills(true);
    window.addEventListener(PORTFOLIO_DATA_UPDATED_EVENT, refreshSkills);

    return () => {
      isMounted = false;
      window.removeEventListener(PORTFOLIO_DATA_UPDATED_EVENT, refreshSkills);
    };
  }, []);

  const filters = ["All", ...Object.keys(skills)];

  const filteredSkills =
    activeFilter === "All"
      ? Object.entries(skills)
      : Object.entries(skills).filter(([category]) => category === activeFilter);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="site-container site-section">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">Tools of the trade</p>
        <h2 id="skills-heading" className="font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
          My Skills
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
          A concise view of the technologies represented in my projects and experience.
        </p>
      </header>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading skills...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Skills Content */}
      {!isLoading && !error && (
        <>
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                whileHover={{ y: -2 }}
                onClick={() => setActiveFilter(filter)}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950
                  ${
                    activeFilter === filter
                      ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                      : "border-slate-200 bg-white text-slate-700 hover:border-primary/50 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  }
                `}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Skill Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map(([category, list], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-7"
              >
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                  <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">{category}</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold tabular-nums text-primary">
                    {list.length} {list.length === 1 ? "skill" : "skills"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {list.map((skill) => (
                    <SkillCard key={skill} name={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
        </>
      )}
    </section>
  );
}
