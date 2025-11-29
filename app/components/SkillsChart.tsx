"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Rectangle,
} from "recharts";
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto p-8 
      bg-gradient-to-br from-lightBg to-white dark:from-darkText dark:to-[#222]
      rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
    >
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center font-extrabold text-2xl md:text-3xl 
      text-darkText dark:text-lightBg mb-8 tracking-wide"
      >
        💡 Skill Strength Overview
      </motion.h2>

      <ResponsiveContainer width="100%" height={330}>
        <BarChart data={skills} layout="vertical" barCategoryGap="25%">
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: "#00C9FF", fontSize: 15, fontWeight: 600 }}
            width={100}
          />
          <XAxis type="number" domain={[0, 100]} hide />
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              background: "#111",
              borderRadius: "10px",
              border: "none",
              color: "#fff",
              padding: "8px 12px",
            }}
          />
          <Bar
            dataKey="level"
            radius={[10, 10, 10, 10]}
            fill="#6C63FF"
            className="transition-all duration-300"
            activeBar={<Rectangle fill="#00C9FF" />}
          >
            <LabelList
              dataKey="level"
              position="right"
              style={{ fill: "#6C63FF", fontWeight: 600 }}
              formatter={(val) => `${val}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
