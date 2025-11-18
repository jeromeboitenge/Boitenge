import SkillCard from '../components/SkillCard';
import { motion } from 'framer-motion';

const skills = {
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express.js', 'NestJS'],
  Databases: ['MongoDB', 'MySQL', 'Prisma', 'Neon'],
  Tools: ['Git', 'Postman', 'VS Code', 'Ubuntu Linux'],
};

export default function Skills() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, list], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {list.map((skill) => (
                <SkillCard key={skill} name={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
