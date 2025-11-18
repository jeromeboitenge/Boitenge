'use client';

import { motion } from 'framer-motion';

export default function SkillCard({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="px-4 py-2 bg-lightBg dark:bg-darkText text-darkText dark:text-lightBg rounded-full shadow hover:shadow-lg transition cursor-pointer"
    >
      {name}
    </motion.div>
  );
}
