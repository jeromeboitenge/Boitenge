'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
}

export default function ProjectCard({ title, description, tech, image, github, demo }: ProjectProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-lightBg dark:bg-darkText rounded-lg shadow-lg overflow-hidden transition cursor-pointer"
    >
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-primary text-white rounded-full text-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-xl text-darkText dark:text-lightBg hover:text-primary">
            <FaGithub />
          </a>
          <a href={demo} target="_blank" rel="noopener noreferrer" className="text-xl text-darkText dark:text-lightBg hover:text-primary">
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
