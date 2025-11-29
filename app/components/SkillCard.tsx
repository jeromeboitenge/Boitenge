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
  SiPrisma,
  SiGit,
  SiPostman,
  SiUbuntu,
  SiNeovim,
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
  Prisma: <SiPrisma />,
  Neon: <SiNeovim />,

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
      bg-lightBg dark:bg-darkText text-darkText dark:text-lightBg
      border border-primary rounded-full shadow 
      hover:shadow-lg transition cursor-pointer"
    >
      <span className="text-xl text-primary">{iconMap[name]}</span>
      <span className="font-medium">{name}</span>
    </motion.div>
  );
}
