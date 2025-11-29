"use client";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

export default function SkillCard({
  name,
  icon,
  level,
  experience,
}: {
  name: string;
  icon: JSX.Element;
  level: number;
  experience: string;
}) {
  const levelColor =
    level >= 90
      ? "bg-green-500"
      : level >= 75
      ? "bg-primary"
      : "bg-accent";

  return (
    <>
      <motion.div
        data-tooltip-id={name}
        whileHover={{ scale: 1.1, rotate: 1 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md border border-gray-200
        dark:border-gray-700 cursor-pointer text-darkText dark:text-lightBg transition 
        ${levelColor} hover:shadow-xl`}
      >
        <span className="text-xl">{icon}</span> {name}
      </motion.div>

      <Tooltip id={name} place="top" style={{ fontSize: "12px", padding: "6px" }}>
        <strong>{name}</strong> — {experience}
      </Tooltip>
    </>
  );
}
