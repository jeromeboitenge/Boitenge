"use client";

import { motion } from "framer-motion";

const profile = {
  name: "Jerome Nzaramyimana",
  title: "Full-Stack Developer · System Analyst · Hardware & Software Maintainer",
  email: "jeromeboitenge@gmail.com",
  phone: "+250 782 433 539",
  location: "Kigali, Rwanda",
  github: "github.com/jeromeboitenge",
  portfolio: "boitenge.vercel.app",
  summary:
    "I am Jerome NZARAMYIMANA, a full-stack developer, frontend specialist, system analyst, and hardware/software maintainer based in Kigali, Rwanda. I build scalable, secure, and visually polished digital solutions while also providing practical hardware support and system analysis.",
};

const technicalSkills = [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "HTML5 & CSS3",
  "Node.js",
  "Express.js",
  "NestJS",
  "REST API Design",
  "MongoDB",
  "PostgreSQL",
  "AI/ML Fundamentals",
  "Git & GitHub",
  "TCP/IP",
  "Cybersecurity Fundamentals",
  "Hardware Maintenance",
];

const certificates = [
  {
    title: "Artificial Intelligence Certification",
    description:
      "Covers supervised and unsupervised learning, neural network architectures, model training and evaluation, AI application development, and ethical AI deployment.",
    link: "#",
  },
  {
    title: "Node.js Development Certification",
    description:
      "Validates advanced server-side JavaScript skills, RESTful API development, Express.js security, database integration, authentication, testing, and production deployment.",
    link: "#",
  },
  {
    title: "Cybersecurity Fundamentals Certification",
    description:
      "Establishes a foundation in network security, threat mitigation, cryptography basics, secure coding, and protecting user data across digital systems.",
    link: "#",
  },
  {
    title: "Frontiers in Intelligent Transportation Systems",
    description:
      "Recognises participation in research around intelligent transportation, AI, IoT, data analytics and embedded systems for smarter transport networks.",
    link: "#",
  },
];

export default function Certificates() {
  return (
    <div className="mt-16">
      <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-900/40"
        >
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                Certifications Profile
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h2>
              <p className="mt-2 text-sm font-semibold text-primary">
                {profile.title}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                  Contact
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <li>
                    <span className="font-semibold">Email:</span> {profile.email}
                  </li>
                  <li>
                    <span className="font-semibold">Phone:</span> {profile.phone}
                  </li>
                  <li>
                    <span className="font-semibold">Location:</span> {profile.location}
                  </li>
                  <li>
                    <span className="font-semibold">GitHub:</span> {profile.github}
                  </li>
                  <li>
                    <span className="font-semibold">Portfolio:</span> {profile.portfolio}
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                  Profile Summary
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {profile.summary}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                Technical Skills
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {technicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-900/40">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                Certification Highlights
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Verified credentials
              </h3>
            </div>
            <div className="rounded-full bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              4 Certificates
            </div>
          </div>

          <div className="grid gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {cert.title}
                  </h4>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    Certificate
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {cert.description}
                </p>
                {cert.link !== "#" ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex text-sm font-semibold text-primary hover:text-primary/90"
                  >
                    View certificate link
                  </a>
                ) : (
                  <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Certificate link available on request.
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
