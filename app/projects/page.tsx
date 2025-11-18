import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Hotel Management System',
    description:
      'A complete hotel management platform including room booking, staff management, online payments, and analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    image: '/hotel-project.jpg', // placeholder
    github: 'https://github.com/jeromeboitenge/hotel-management-system',
    demo: '#',
  },
  {
    title: 'Event Management System (HitamoSpace)',
    description:
      'Manage internal and external events with intelligent scheduling, QR code registration, and finance tracking.',
    tech: ['Next.js', 'Node.js', 'Prisma', 'Tailwind CSS'],
    image: '/event-project.jpg',
    github: 'https://github.com/jeromeboitenge/hitamospace',
    demo: '#',
  },
  {
    title: 'Tourism / ExploreHub Platform',
    description:
      'A tourism platform to explore, review, and share destinations in Rwanda with Google Maps integration.',
    tech: ['MERN Stack', 'Google Maps API', 'Tailwind CSS'],
    image: '/explorehub-project.jpg',
    github: 'https://github.com/jeromeboitenge/explorehub',
    demo: '#',
  },
  {
    title: 'Extra Placeholder Project',
    description: 'This is a placeholder for future exciting projects.',
    tech: ['React', 'Node.js'],
    image: '/placeholder.jpg',
    github: '#',
    demo: '#',
  },
];

export default function Projects() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
