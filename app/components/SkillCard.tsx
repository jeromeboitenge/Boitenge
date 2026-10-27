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

import { VscCode, VscVscode } from "react-icons/vsc";


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
      whileHover={{ y: -2, scale: 1.01 }}
      className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/[0.03] dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-primary/10"
    >
      <span className="text-lg text-primary" aria-hidden="true">{iconMap[name] ?? <VscCode />}</span>
      <span className="font-semibold">{name}</span>
    </motion.div>
  );
}
