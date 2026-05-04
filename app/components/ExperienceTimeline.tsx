"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaLaptopCode, FaGraduationCap, FaStar } from "react-icons/fa";

const experiences = [
  {
    year: "2025",
    title: "Internship at UR Hitamo Space",
    position: "Frontend Developer & Documentalist Intern",
    desc: "Developed Event Management System with Next.js, Prisma, and Tailwind. Collaborated in a 4-member dev team.",
    icon: <FaBriefcase />,
    tech: ["Next.js", "Prisma", "Tailwind", "Framer Motion"],
  },
  {
    year: "2024",
    title: "University Class Projects",
    position: "Student Developer",
    desc: "Developed multiple web apps and dashboards using React & Tailwind, including a voting system and ExploreHub.",
    icon: <FaGraduationCap />,
    tech: ["React", "Tailwind", "JavaScript", "Firebase"],
  },
  {
    year: "2023",
    title: "Freelance Web Developer",
    position: "React & Node.js Developer",
    desc: "Delivered small business websites, e-commerce platforms, and API integrations for local clients, including an advanced hotel management system.",
    icon: <FaStar />,
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
  },
  {
    year: "2022",
    title: "Personal Projects & Open Source",
    position: "Full-Stack Developer",
    desc: "Built hobby projects and contributed to open-source projects on GitHub to improve coding skills.",
    icon: <FaLaptopCode />,
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
  }
];

export default function ExperienceTimeline() {
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
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 md:pl-12"
          >
            {/* Glowing Node */}
            <div className="absolute -left-5 top-1 bg-white dark:bg-slate-900 border-4 border-primary w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,98,143,0.4)] z-10">
              <span className="text-primary text-sm">{exp.icon}</span>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-[2rem] group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-primary font-medium mt-1">
                    {exp.position}
                  </p>
                </div>
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-300 w-fit">
                  {exp.year}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {exp.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
