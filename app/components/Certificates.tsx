"use client";

import { motion } from "framer-motion";

const certificates = [
  {
    title: "Frontend Development Certificate",
    issuer: "FreeCodeCamp",
    link: "#",
  },
  {
    title: "Full-Stack MERN Certification",
    issuer: "Udemy",
    link: "#",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "FreeCodeCamp",
    link: "#",
  },
];

export default function Certificates() {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6 text-darkText dark:text-white">
        Certificates & Achievements
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, idx) => (
          <motion.a
            key={idx}
            href={cert.link}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-lightBg dark:bg-[#111] shadow-lg rounded-lg border-l-4 border-primary hover:border-accent transition-all"
          >
            <h4 className="font-semibold text-lg text-darkText dark:text-white">
              {cert.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {cert.issuer}
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
