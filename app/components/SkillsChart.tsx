"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { skill: "React", level: 90 },
  { skill: "Next.js", level: 85 },
  { skill: "Tailwind", level: 80 },
  { skill: "Node.js", level: 75 },
  { skill: "MongoDB", level: 70 },
];

export default function SkillsChart() {
  return (
    <div className="w-full h-80 bg-lightBg dark:bg-[#111] rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold text-center mb-4 text-darkText dark:text-white">
        Skill Strength Overview
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#6C63FF" />
          <PolarAngleAxis dataKey="skill" stroke="#00C9FF" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />
          <Radar
            name="Skill Level"
            dataKey="level"
            stroke="#6C63FF"
            fill="#6C63FF"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
