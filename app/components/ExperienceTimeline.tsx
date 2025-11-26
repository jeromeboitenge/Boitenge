'use client';
import { motion } from 'framer-motion';
import { FaBriefcase, FaLaptopCode, FaGraduationCap, FaStar } from 'react-icons/fa';

const experiences = [
  {
    year: '2025',
    title: 'Internship at UR Hitamo space',
    position: 'Frontend Developer & Documentalist Intern',
    desc: 'Developed Event Management System with Next.js, Prisma, and Tailwind. Collaborated in a 4-member dev team.',
    icon: <FaBriefcase />,
  },
  {
    year: '2024',
    title: 'University Class Projects',
    position: 'Student Developer',
    desc: 'Developed multiple web apps and dashboards using React, Tailwind that includes  A voting system, Explore Hub',
    icon: <FaGraduationCap />,
  },
  
  {
    year: '2023',
    title: 'Freelance Web Developer',
    position: 'React & Node.js Developer',
    desc: 'Delivered small business websites, e-commerce platforms, and API integrations for local clients, advanced hotel management.',
    icon: <FaStar />,
  },
  
  {
    year: '2022',
    title: 'Personal Projects & Open Source',
    position: 'Full-Stack Developer',
    desc: 'Built hobby projects and contributed to open-source projects on GitHub to improve coding skills.',
    icon: <FaLaptopCode />,
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="relative border-l-2 border-primary ml-4">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="mb-10 ml-6 relative"
        >
          <span className="absolute -left-5 top-0 text-primary text-2xl">
            {exp.icon}
          </span>
          <h3 className="text-xl font-semibold">{exp.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">{exp.year} — {exp.position}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-200">{exp.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
