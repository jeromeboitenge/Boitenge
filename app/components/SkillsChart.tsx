"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaToolbox } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiTypescript } from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <FaReact className="text-4xl text-sky-400 mb-4" />,
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    colSpan: "md:col-span-2",
  },
  {
    title: "Backend & APIs",
    icon: <FaNodeJs className="text-4xl text-green-500 mb-4" />,
    skills: ["Node.js", "Express", "RESTful APIs", "GraphQL"],
    colSpan: "md:col-span-1",
  },
  {
    title: "Databases",
    icon: <FaDatabase className="text-4xl text-blue-500 mb-4" />,
    skills: ["MongoDB", "PostgreSQL", "Prisma ORM", "Redis"],
    colSpan: "md:col-span-1",
  },
  {
    title: "Tools & DevOps",
    icon: <FaToolbox className="text-4xl text-orange-500 mb-4" />,
    skills: ["Git & GitHub", "Docker", "AWS / Vercel", "CI/CD"],
    colSpan: "md:col-span-2",
  },
];

export default function SkillsChart() {
  return (
    <div className="w-full max-w-6xl mx-auto py-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Technical Arsenal</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mt-2">
          Skills & Technologies
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900 max-[320px]:p-4 ${category.colSpan}`}
          >
            {category.icon}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-3 mt-auto">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="cursor-default rounded bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:bg-slate-800 dark:text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
