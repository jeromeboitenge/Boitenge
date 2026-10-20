'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaRocket, FaUsers, FaLightbulb, FaCode, FaDownload, FaHandshake } from "react-icons/fa";
import AnimatedCounter from "../components/AnimatedCounter";
import { PORTFOLIO_DATA_UPDATED_EVENT, unifiedApiClient } from "../lib/unified-api-client";
import { useProfileStore } from "../stores/profileStore";

interface Stat {
  value: number | null;
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
    { value: null, label: "Years Experience", loading: true },
    { value: null, label: "Projects", loading: true },
    { value: null, label: "Technologies", loading: true },
    { value: null, label: "Certifications", loading: true },
  ]);
  const { cvUrl } = useProfileStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let isCurrent = true;

    const fetchStats = async () => {
      try {
        const [projectsData, skillsData, experienceData, certificatesData] = await Promise.all([
          unifiedApiClient.getProjects(),
          unifiedApiClient.getSkills(),
          unifiedApiClient.getExperience(),
          unifiedApiClient.getCertificates(),
        ]);

        const visibleProjects = projectsData.filter((project) => project.isPublished);
        const visibleSkills = skillsData.filter((skill) => skill.isVisible);
        const visibleExperience = experienceData.filter((experience) => experience.isVisible);
        const visibleCertificates = certificatesData.filter((certificate) => certificate.isVisible);

        let yearsExperience = 0;
        const startTimes = visibleExperience
          .map((experience) => new Date(experience.startDate).getTime())
          .filter(Number.isFinite);
        const endTimes = visibleExperience
          .map((experience) => experience.endDate ? new Date(experience.endDate).getTime() : Date.now())
          .filter(Number.isFinite);

        if (startTimes.length && endTimes.length) {
          const years = (Math.max(...endTimes) - Math.min(...startTimes)) / (1000 * 60 * 60 * 24 * 365.25);
          yearsExperience = Math.max(1, Math.round(years));
        }

        const techSet = new Set<string>();
        visibleProjects.forEach((project) => project.technologies?.forEach((technology) => {
          const normalized = technology.trim().toLocaleLowerCase();
          if (normalized) techSet.add(normalized);
        }));
        visibleSkills.forEach((skill) => {
          const normalized = skill.name.trim().toLocaleLowerCase();
          if (normalized) techSet.add(normalized);
        });

        const nextStats: Stat[] = [
          { value: yearsExperience, label: "Years Experience" },
          { value: visibleProjects.length, label: "Projects" },
          { value: techSet.size, label: "Technologies" },
          { value: visibleCertificates.length, label: "Certifications" },
        ];
        if (!isCurrent) return;
        setStats(nextStats);
      } catch (err) {
        console.error('Failed to load stats:', err);
        if (isCurrent) {
          setStats((prev) => prev.map((stat) => ({ ...stat, value: null, loading: false })));
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') void fetchStats();
    };

    void fetchStats();
    window.addEventListener('focus', fetchStats);
    window.addEventListener('storage', fetchStats);
    window.addEventListener(PORTFOLIO_DATA_UPDATED_EVENT, fetchStats);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isCurrent = false;
      window.removeEventListener('focus', fetchStats);
      window.removeEventListener('storage', fetchStats);
      window.removeEventListener(PORTFOLIO_DATA_UPDATED_EVENT, fetchStats);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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
        className="rounded-2xl border border-slate-200 bg-white/90 p-6 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8"
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
          <div className="flex shrink-0">
            <a
              href={cvUrl || '#'}
              onClick={downloadOrOpenCv}
              target={cvUrl && !cvUrl.includes('drive.google.com') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
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
        className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-center transition-colors hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <p className="text-4xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {stat.loading ? (
                <span className="inline-block w-12 h-8 bg-slate-200 dark:bg-slate-700 animate-pulse rounded align-middle" />
              ) : (
                stat.value === null ? '—' : <AnimatedCounter value={stat.value} />
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
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
            <FaHandshake className="text-primary text-lg" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How I Work</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white/90 p-6 transition-colors hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-primary/10">
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
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10">
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