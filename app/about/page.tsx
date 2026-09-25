'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaRocket, FaUsers, FaLightbulb, FaCode, FaDownload, FaHandshake } from "react-icons/fa";
import AnimatedCounter from "../components/AnimatedCounter";
import { unifiedApiClient } from "../lib/unified-api-client";
import { apiClient } from "../lib/api-client";
import { useProfileStore } from "../stores/profileStore";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  loading?: boolean;
}

const values = [
  { icon: <FaRocket className="text-primary text-xl" />, title: "Product-Driven", desc: "I measure success by real outcomes, not just shipped code. Every feature maps to a business goal." },
  { icon: <FaCode className="text-primary text-xl" />, title: "Clean Systems", desc: "Scalable, maintainable architecture — reusable components, solid APIs, and thoughtful data modeling." },
  { icon: <FaUsers className="text-primary text-xl" />, title: "Collaborative", desc: "I keep stakeholders and teammates in the loop early and often, turning ambiguity into clarity." },
  { icon: <FaLightbulb className="text-primary text-xl" />, title: "User-Centric", desc: "I design systems and interfaces with empathy, so features feel intuitive and effortless." },
];

const coreStack = [
  "React", "Next.js", "TypeScript", "Node.js", "NestJS",
  "Tailwind CSS", "MongoDB", "Prisma", "Git", "Docker",
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Stat[]>([
    { value: 0, suffix: '+', label: "Years Experience", loading: true },
    { value: 0, suffix: '+', label: "Projects Shipped", loading: true },
    { value: 0, suffix: '+', label: "Technologies", loading: true },
    { value: 0, suffix: '+', label: "Certifications", loading: true },
  ]);
  const { cvUrl } = useProfileStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsData, skillsData, experienceData, certificatesData] = await Promise.all([
          unifiedApiClient.getProjects(),
          unifiedApiClient.getSkills(),
          unifiedApiClient.getExperience(),
          apiClient.getCertificates(),
        ]);

        // Years experience: span between earliest start and most recent end date
        let yearsExperience = 0;
        if (experienceData.length > 0) {
          const valid = experienceData.filter((e) => e.startDate);
          if (valid.length > 0) {
            const earliestStart = new Date(
              Math.min(...valid.map((e) => new Date(e.startDate).getTime()))
            );
            const latestEnd = new Date(
              Math.max(
                ...valid.map((e) =>
                  e.endDate ? new Date(e.endDate).getTime() : Date.now()
                )
              )
            );
            const years = (latestEnd.getTime() - earliestStart.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
            yearsExperience = Math.max(1, Math.round(years));
          }
        }

        // Unique technologies across projects and skills
        const techSet = new Set<string>();
        projectsData.forEach((p) => p.technologies?.forEach((t) => techSet.add(t)));
        skillsData.forEach((s) => techSet.add(s.name));

        const nextStats: Stat[] = [
          { value: yearsExperience, suffix: '+', label: "Years Experience" },
          { value: projectsData.length, suffix: '+', label: "Projects Shipped" },
          { value: techSet.size, suffix: '+', label: "Technologies" },
          { value: certificatesData.length, suffix: '+', label: "Certifications" },
        ];
        setStats(nextStats);
      } catch (err) {
        console.error('Failed to load stats:', err);
        setStats((prev) => prev.map((s) => ({ ...s, loading: false })));
      }
    };

    fetchStats();
  }, []);

  const MotionDiv = mounted ? motion.div : 'div';

  const downloadOrOpenCv = (e: React.MouseEvent) => {
    if (!cvUrl || cvUrl.includes('drive.google.com')) {
      e.preventDefault();
      window.open(
        'https://drive.google.com/file/d/1jhl1MrnuTMItHuivMO-jI6WLrKJlv6Bt/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <section id="about" className="max-w-7xl mx-auto py-20 px-4 md:px-8">

      {/* Focus narrative */}
      <MotionDiv
        {...(mounted ? {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7 }
        } : {})}
        className="rounded-3xl bg-white/90 p-10 shadow-xl ring-1 ring-slate-100 dark:bg-slate-900/70 dark:ring-slate-800"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary">
              About Jerome
            </p>
            <h1 className="mt-4 text-3xl font-bold text-darkText dark:text-lightBg">
              Engineering premium digital experiences with product empathy.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              I help founders and teams ship elegant, measurable software. My work blends strategy, design systems,
              and resilient full-stack engineering so every feature feels intentional and performant. I collaborate
              closely with product teams, mentor developers, and champion user-centric delivery at every stage of the build.
            </p>
          </div>
          <div className="flex md:flex-col gap-3 shrink-0">
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open to work
            </span>
            <a
              href={cvUrl || '#'}
              onClick={downloadOrOpenCv}
              target={cvUrl && !cvUrl.includes('drive.google.com') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-white px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25"
            >
              <FaDownload className="text-xs" /> Download CV
            </a>
          </div>
        </div>
      </MotionDiv>

      {/* Stats row */}
      <MotionDiv
        {...(mounted ? {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.1 }
        } : {})}
        className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white/90 dark:bg-slate-900/70 p-6 text-center shadow-lg ring-1 ring-slate-100 dark:ring-slate-800 hover:ring-primary/30 transition-all hover:-translate-y-1"
          >
            <p className="text-4xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {stat.loading ? (
                <span className="inline-block w-12 h-8 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg align-middle" />
              ) : (
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              )}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{stat.label}</p>
          </div>
        ))}
      </MotionDiv>

      {/* Values grid */}
      <MotionDiv
        {...(mounted ? {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.2 }
        } : {})}
        className="mt-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FaHandshake className="text-primary text-lg" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How I Work</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/90 dark:bg-slate-900/70 p-6 shadow-lg ring-1 ring-slate-100 dark:ring-slate-800 hover:ring-primary/30 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{value.desc}</p>
            </div>
          ))}
        </div>
      </MotionDiv>

      {/* Core stack */}
      <MotionDiv
        {...(mounted ? {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.3 }
        } : {})}
        className="mt-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FaCode className="text-primary text-lg" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Core Stack</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {coreStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:border-primary/50 hover:text-primary dark:hover:text-primary transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </MotionDiv>
    </section>
  );
}