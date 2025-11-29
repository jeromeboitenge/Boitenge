"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle } from "recharts";
import { motion } from "framer-motion";

const skills = [
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Tailwind", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "MongoDB", level: 70 },
];

export default function SkillsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto p-6 bg-lightBg dark:bg-darkText rounded-xl shadow-lg"
    >
      <h2 className="text-center text-darkText dark:text-lightBg font-bold text-xl mb-6">
        Skill Strength Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={skills} layout="vertical" barCategoryGap="20%">
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: "#00C9FF", fontSize: 14 }}
            width={90}
          />
          <XAxis type="number" domain={[0, 100]} hide />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="level"
            radius={[8, 8, 8, 8]}
            fill="#6C63FF"
            activeBar={<Rectangle fill="#00C9FF" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
