"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaLinux, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiExpress, SiNestjs, SiMongodb, SiMysql, SiPostman, SiVscode } from "react-icons/si";

const skills = [
  { name: "React", level: 90, icon: <FaReact /> },
  { name: "Next.js", level: 85, icon: <SiNextdotjs /> },
  { name: "Tailwind CSS", level: 88, icon: <SiTailwindcss /> },
  { name: "HTML", level: 95, icon: <FaHtml5 /> },
  { name: "CSS", level: 92, icon: <FaCss3Alt /> },
  { name: "Node.js", level: 80, icon: <FaNodeJs /> },
  { name: "Express.js", level: 78, icon: <SiExpress /> },
  { name: "NestJS", level: 70, icon: <SiNestjs /> },
  { name: "MongoDB", level: 85, icon: <SiMongodb /> },
  { name: "MySQL", level: 82, icon: <SiMysql /> },
  { name: "Postman", level: 90, icon: <SiPostman /> },
  { name: "VS Code", level: 95, icon: <SiVscode /> },
  { name: "Ubuntu Linux", level: 88, icon: <FaLinux /> },
  { name: "Git", level: 92, icon: <FaGitAlt /> },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        My Skills 🚀
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="bg-white dark:bg-gray-900 shadow-lg p-6 rounded-xl hover:scale-105 duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3 text-primary text-3xl">
              {skill.icon}
              <span className="font-semibold text-lg">{skill.name}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full">
              <div
                className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p className="text-right text-sm mt-1 font-semibold">{skill.level}%</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
