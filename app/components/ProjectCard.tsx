'use client';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {tech.map((t) => (
            <span
              key={t}
              className="bg-primary text-white px-2 py-1 rounded text-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
