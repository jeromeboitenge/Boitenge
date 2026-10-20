"use client";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
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
  CSS: <SiCss />,

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
      whileHover={{ y: -2 }}
      className="flex items-center gap-2 rounded-md border border-slate-200 bg-lightCard px-3 py-2 text-lightText transition-colors hover:border-primary/50 dark:border-slate-800 dark:bg-darkCard dark:text-darkText"
    >
      <span className="text-xl text-primary">{iconMap[name]}</span>
      <span className="font-medium">{name}</span>
    </motion.div>
  );
}
