"use client";

import { motion } from "framer-motion";

export default function SkillCard({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      className="px-4 py-2 bg-accent/20 dark:bg-primary/30 
        text-darkText dark:text-white rounded-full 
        shadow-sm border border-accent hover:border-primary 
        font-medium transition cursor-pointer"
    >
      {name}
    </motion.div>
  );
}
