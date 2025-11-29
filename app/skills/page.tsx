"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import SkillCard from "../components/SkillCard";
import SkillsChart from "../components/SkillsChart";
import Certificates from "../components/Certificates";

// Icons
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaLinux,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiVscode,
} from "react-icons/si";

const skillData = {
  Frontend: [
    { name: "React", level: 90, icon: <FaReact />, experience: "3 years building UI apps" },
    { name: "Next.js", level: 85, icon: <SiNextdotjs />, experience: "SEO + SSR websites" },
    { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss />, experience: "Fast UI development" },
    { name: "HTML", level: 95, icon: <FaHtml5 />, experience: "Strong semantic HTML" },
    { name: "CSS", level: 92, icon: <FaCss3Alt />, experience: "Animations + Responsive Design" },
  ],
  Backend: [
    { name: "Node.js", level: 80, icon: <FaNodeJs />, experience: "REST APIs & Authentication" },
    { name: "Express.js", level: 78, icon: <SiExpress />, experience: "Backend routing & middleware" },
    { name: "NestJS", level: 70, icon: <SiNestjs />, experience: "Structured scalable APIs" },
  ],
  Databases: [
    { name: "MongoDB", level: 85, icon: <SiMongodb />, experience: "MERN stack experience" },
    { name: "MySQL", level: 82, icon: <SiMysql />, experience: "Relational DB models" },
  ],
  Tools: [
    { name: "Git", level: 92, icon: <FaGitAlt />, experience: "Professional collaboration" },
    { name: "VS Code", level: 95, icon: <SiVscode />, experience: "Daily coding environment" },
    { name: "Ubuntu Linux", level: 88, icon: <FaLinux />, experience: "Servers & CLI tools" },
    { name: "Postman", level: 90, icon: <SiPostman />, experience: "API testing & debugging" },
  ],
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend");

  return (
    <section id="skills" className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        Skills & Expertise 🚀
      </motion.h2>

      <div className="flex justify-center gap-3 mb-10">
        {Object.keys(skillData).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-white 
              ${selectedCategory === category ? "bg-primary" : "bg-accent"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillData[selectedCategory].map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>

      <SkillsChart />

      <Certificates />
    </section>
  );
}
