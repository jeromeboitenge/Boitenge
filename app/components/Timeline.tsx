'use client';
import { motion } from 'framer-motion';

const timelineData = [
  {
    year: '2025',
    title: 'Internship at Giraffe Space',
    desc: 'Worked as a Full-Stack Developer on Event Management System',
  },
  {
    year: '2024',
    title: 'ExploreHub Project',
    desc: 'Developed a tourism platform using MERN stack',
  },
  {
    year: '2023',
    title: 'University Projects',
    desc: 'Built various web applications using React, Node.js, and Tailwind',
  },
];

export default function Timeline() {
  return (
    <div className="relative border-l-2 border-primary ml-4">
      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="mb-8 ml-6"
        >
          <span className="absolute -left-4 bg-primary rounded-full w-6 h-6 top-0"></span>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <time className="text-sm text-gray-500 dark:text-gray-300">{item.year}</time>
          <p className="mt-2 text-gray-700 dark:text-gray-200">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
