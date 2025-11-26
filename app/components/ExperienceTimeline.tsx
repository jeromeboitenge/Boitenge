'use client';
import { motion } from 'framer-motion';
import { FaBriefcase, FaLaptopCode, FaGraduationCap, FaStar } from 'react-icons/fa';

const experiences = [
  {
    year: '2025',
    title: 'Internship at UR Hitamo Space',
    position: 'Frontend Developer & Documentalist Intern',
    desc: 'Developed an Event Management System using Next.js, Prisma, and Tailwind. Collaborated in a 4-member dev team to deliver high-quality features.',
    icon: <FaBriefcase />,
    color: 'bg-primary text-white',
  },
  {
    year: '2024',
    title: 'University Class Projects',
    position: 'Student Developer',
    desc: 'Built multiple web applications and dashboards using React and Tailwind, including a voting system and Explore Hub.',
    icon: <FaGraduationCap />,
    color: 'bg-accent text-white',
  },
  {
    year: '2023',
    title: 'Freelance Web Developer',
    position: 'React & Node.js Developer',
    desc: 'Delivered websites, e-commerce platforms, and API integrations for local clients, including an advanced hotel management system.',
    icon: <FaStar />,
    color: 'bg-yellow-500 text-white',
  },
  {
    year: '2022',
    title: 'Personal Projects & Open Source',
    position: 'Full-Stack Developer',
    desc: 'Built hobby projects and contributed to open-source projects on GitHub to enhance coding skills and portfolio.',
    icon: <FaLaptopCode />,
    color: 'bg-green-500 text-white',
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="relative border-l-4 border-primary ml-6 pl-6">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.3 }}
          className="mb-12 relative"
        >
          {/* Icon */}
          <span className={`absolute -left-8 top-0 p-3 rounded-full flex items-center justify-center ${exp.color}`}>
            {exp.icon}
          </span>

          {/* Card-like container */}
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-5 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-darkText dark:text-white">{exp.title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{exp.year} — {exp.position}</p>
            <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">{exp.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
