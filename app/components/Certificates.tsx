"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import type { Certificate } from "@/types/content";

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

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getCertificates();
        setCertificates(data.sort((a, b) => a.order - b.order));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load certificates');
        console.error('Error fetching certificates:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);
  if (isLoading) {
    return (
      <div className="mt-16">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <div className="text-center py-20">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-900/40"
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                  Certifications Profile
                </p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                  {profile.name}
                </h2>
                <p className="mt-3 max-w-xl text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {profile.title}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {certificates.length} Certificates
                </span>
                <a
                  href="https://boitenge.vercel.app"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  View portfolio
                </a>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                    Contact
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                    Profile
                  </span>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <li>
                    <span className="font-semibold text-slate-900 dark:text-white">Email:</span> {profile.email}
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900 dark:text-white">Phone:</span> {profile.phone}
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900 dark:text-white">Location:</span> {profile.location}
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900 dark:text-white">GitHub:</span> {profile.github}
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900 dark:text-white">Portfolio:</span> {profile.portfolio}
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
                <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                  Profile Summary
                </h3>
                <p className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {profile.summary}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-100 p-6 shadow-sm dark:bg-slate-900">
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                Technical Skills
              </h3>
              <div className="mt-5 grid gap-2 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
                {technicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200"
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
              {certificates.length} Certificates
            </div>
          </div>

          <div className="grid gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {cert.name}
                  </h4>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    {cert.issuer}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Issued: {cert.issueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </p>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
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
