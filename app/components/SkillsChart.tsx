"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const skills = [
  { subject: "React", A: 90 },
  { subject: "Next.js", A: 85 },
  { subject: "Tailwind", A: 80 },
  { subject: "Node.js", A: 75 },
  { subject: "MongoDB", A: 70 },
];

export default function SkillsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto p-6 bg-lightBg dark:bg-darkText rounded-xl shadow-lg"
    >
      <h2 className="text-center text-darkText dark:text-lightBg font-bold text-xl mb-4">
        Skill Strength Overview
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
          <PolarGrid stroke="rgba(0,201,255,0.4)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#00C9FF", fontSize: 14 }}
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#6C63FF"
            fill="#6C63FF"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
