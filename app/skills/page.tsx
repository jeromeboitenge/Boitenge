"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SkillCard from "../components/SkillCard";
import SkillsChart from "../components/SkillsChart";
import Certificates from "../components/Certificates";
import { apiClient } from "@/lib/api-client";
import { Skill } from "@/types";

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [skills, setSkills] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getSkills();
        
        // Group skills by category
        const grouped = data.reduce((acc, skill) => {
          const category = skill.category.charAt(0).toUpperCase() + skill.category.slice(1);
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(skill.name);
          return acc;
        }, {} as Record<string, string[]>);
        
        setSkills(grouped);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
        setError('Failed to load skills. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filters = ["All", ...Object.keys(skills)];

  const filteredSkills =
    activeFilter === "All"
      ? Object.entries(skills)
      : Object.entries(skills).filter(([category]) => category === activeFilter);

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <h2 className="text-4xl font-bold text-center text-darkText dark:text-white mb-8">
        My Skills
      </h2>

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
            {filters.map((filter, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-medium transition 
                  ${
                    activeFilter === filter
                      ? "bg-primary text-white shadow-lg"
                      : "bg-lightBg dark:bg-darkCard text-lightText dark:text-darkText border border-primary"
                  }
                `}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredSkills.map(([category, list], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="bg-lightBg dark:bg-[#111] shadow-md p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {list.map((skill) => (
                    <SkillCard key={skill} name={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts & Certificates */}
          <div className="mt-16">
            <SkillsChart />
            <Certificates />
          </div>
        </>
      )}
    </section>
  );
}
