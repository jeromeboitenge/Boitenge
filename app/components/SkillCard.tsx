"use client";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiPostman,
  SiUbuntu,
  SiTypescript,
  SiJavascript,
  SiDocker,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";


const iconMap: Record<string, JSX.Element> = {
  React: <SiReact />,
  "Next.js": <SiNextdotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,

  "Node.js": <SiNodedotjs />,
  "Express.js": <SiExpress />,
  NestJS: <SiNestjs />,

  MongoDB: <SiMongodb />,
  MySQL: <SiMysql />,
  PostgreSQL: <SiPostgresql />,
  Prisma: <SiPrisma />,

  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
  Docker: <SiDocker />,

  Git: <SiGit />,
  Postman: <SiPostman />,
  "VS Code": <VscVscode />,
  "Ubuntu Linux": <SiUbuntu />,
};


export default function SkillCard({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="flex items-center gap-2 px-4 py-2
      bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText
      border border-primary rounded-full shadow 
      hover:shadow-lg transition cursor-pointer"
    >
      <span className="text-xl text-primary">{iconMap[name]}</span>
      <span className="font-medium">{name}</span>
    </motion.div>
  );
}
