"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaLaptopCode, FaGraduationCap, FaStar } from "react-icons/fa";
import { useState } from "react";

const experiences = [
  {
    year: "2025",
    title: "Internship at UR Hitamo Space",
    position: "Frontend Developer & Documentalist Intern",
    desc: "Developed Event Management System with Next.js, Prisma, and Tailwind. Collaborated in a 4-member dev team.",
    icon: <FaBriefcase />,
    tech: ["Next.js", "Prisma", "Tailwind", "Framer Motion"],
    details: "Focused on frontend pages, event scheduling features, and documentation of system modules."
  },
  {
    year: "2024",
    title: "University Class Projects",
    position: "Student Developer",
    desc: "Developed multiple web apps and dashboards using React & Tailwind, including a voting system and ExploreHub.",
    icon: <FaGraduationCap />,
    tech: ["React", "Tailwind", "JavaScript", "Firebase"],
    details: "Implemented user authentication, CRUD operations, and responsive UI for multiple university projects."
  },
  {
    year: "2023",
    title: "Freelance Web Developer",
    position: "React & Node.js Developer",
    desc: "Delivered small business websites, e-commerce platforms, and API integrations for local clients, including an advanced hotel management system.",
    icon: <FaStar />,
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    details: "Focused on full-stack development with responsive UI, secure authentication, and online payments."
  },
  {
    year: "2022",
    title: "Personal Projects & Open Source",
    position: "Full-Stack Developer",
    desc: "Built hobby projects and contributed to open-source projects on GitHub to improve coding skills.",
    icon: <FaLaptopCode />,
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    details: "Explored APIs, GitHub collaboration, and improving code quality through best practices."
  }
];

export default function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative ml-4 border-l-4 border-primary">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="mb-12 ml-6 relative cursor-pointer hover:scale-105 hover:shadow-lg transition-transform duration-300 rounded-lg p-6 bg-lightBg dark:bg-[#111]"
          onClick={() => setActiveIndex(index === activeIndex ? null : index)}
        >
          {/* Icon */}
          <span className="absolute -left-8 top-4 text-primary text-3xl">
            {exp.icon}
          </span>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-semibold text-darkText dark:text-white group-hover:text-primary transition-colors">
            {exp.title}
          </h3>

          {/* Position & Year */}
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-300 mt-1">
            {exp.year} — {exp.position}
          </p>

          {/* Description */}
          <p className="mt-2 text-gray-700 dark:text-gray-200 text-sm md:text-base">
            {exp.desc}
          </p>

          {/* Tech Badges */}
<div className="mt-3 flex flex-wrap gap-2">
  {exp.tech.map((tech, idx) => (
    <span
      key={idx}
      className="bg-primary/20 dark:bg-primary/30 text-accent dark:text-primary text-xs md:text-sm px-2 py-1 rounded-full font-medium"
    >
      {tech}
    </span>
  ))}
</div>


          {/* Expandable Details */}
          {activeIndex === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base bg-primary/10 dark:bg-accent/20 p-3 rounded"
            >
              {exp.details}
            </motion.div>
          )}

          {/* Accent hover line */}
          <div className="absolute left-0 top-0 h-full w-1 bg-accent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded"></div>
        </motion.div>
      ))}
    </div>
  );
}
