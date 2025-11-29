"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SkillCard from "../components/SkillCard";
import SkillsChart from "../components/SkillsChart";
import Certificates from "../components/Certificates";

const skills = {
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express.js', 'NestJS'],
  Databases: ['MongoDB', 'MySQL', 'Prisma', 'Neon'],
  Tools: ['Git', 'Postman', 'VS Code', 'Ubuntu Linux'],
};

const filters = ["All", ...Object.keys(skills)];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSkills =
    activeFilter === "All"
      ? Object.entries(skills)
      : Object.entries(skills).filter(([category]) => category === activeFilter);

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <h2 className="text-4xl font-bold text-center text-darkText dark:text-white mb-8">
        My Skills
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filters.map((filter, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full font medium transition 
              ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-lg"
                  : "bg-lightBg dark:bg-darkText text-darkText dark:text-white border border-primary"
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
    </section>
  );
}
