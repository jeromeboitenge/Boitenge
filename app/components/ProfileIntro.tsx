'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PublicLocationDisplay from "./PublicLocationDisplay";

const badges = ["Full-stack Engineer", "Design Systems", "Hardware & Software Maintenance"];

export default function ProfileIntro({ showButtons = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show content immediately, animate when mounted
  const MotionDiv = mounted ? motion.div : 'div';
  
  return (
    <div className="relative pt-20 pb-10 sm:pt-24 md:py-32 flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-20 px-4 sm:px-6 md:px-8 lg:px-0">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-40 -left-20 w-60 h-60 sm:w-72 sm:h-72 bg-accent/20 rounded-full blur-[80px] animate-blob" style={{ animationDelay: '2s' }} />
      </div>

      {/* TEXT CONTENT */}
      <MotionDiv
        {...(mounted ? {
          initial: { opacity: 0, x: -50 },
          whileInView: { opacity: 1, x: 0 },
          transition: { duration: 0.8, ease: "easeOut" }
        } : {})}
        className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 text-center md:text-left z-10 w-full max-w-3xl"
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:justify-start">
          {badges.map((badge, idx) => {
            const BadgeMotion = mounted ? motion.span : 'span';
            return (
              <BadgeMotion
                {...(mounted ? {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3 + idx * 0.1 }
                } : {})}
                key={badge}
                className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                {badge}
              </BadgeMotion>
            );
          })}
        </div>
        
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400">
            Hello, I am
          </h2>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 dark:text-white leading-[1.1]">
            Jerome <br className="hidden sm:block md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Nzaramyimana</span>
          </h1>
        </div>

        <p className="text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl mx-auto md:mx-0">
          I design and engineer premium digital experiences across React, Next.js, and Node.js—blending product
          thinking with scalable infrastructure so launches feel effortless and polished.
        </p>

        {showButtons && (
          <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-3.5 text-xs xs:text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-primary/50 active:scale-95">
              Let's build together
            </a>
            <a
              href="https://drive.google.com/file/d/1jhl1MrnuTMItHuivMO-jI6WLrKJlv6Bt/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 px-6 sm:px-8 py-3 sm:py-3.5 text-xs xs:text-sm font-semibold text-slate-900 dark:text-white transition-all hover:-translate-y-1 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-sm active:scale-95"
            >
              View CV
            </a>
          </div>
        )}
      </MotionDiv>

      {/* IMAGE CONTENT */}
      <MotionDiv
        {...(mounted ? {
          initial: { opacity: 0, scale: 0.9, rotate: -5 },
          whileInView: { opacity: 1, scale: 1, rotate: 0 },
          transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
        } : {})}
        className="relative flex-shrink-0 z-10 w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-md"
      >
        <div className="relative w-full aspect-square">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] rotate-6 opacity-30 blur-lg animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] -rotate-3 transition-transform duration-500 hover:rotate-0" />
          
          <div className="absolute inset-1 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900 border-2 sm:border-4 border-white dark:border-slate-800">
            <Image
              src="/Nzaramyimana-Jerome.jpeg"
              alt="Jerome Nzaramyimana"
              fill
              sizes="(max-width: 375px) 240px, (max-width: 640px) 280px, (max-width: 768px) 320px, 448px"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl">
              <PublicLocationDisplay />
            </div>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
}
