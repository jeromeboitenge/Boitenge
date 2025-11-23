"use client";

import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projectsData'; 
import { ArrowRight, ArrowLeft } from 'lucide-react'; 

// Define the number of projects to show by default
const DEFAULT_PROJECTS_COUNT = 3;

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);

  const projectsToShow = showAll 
    ? projectsData 
    : projectsData.slice(0, DEFAULT_PROJECTS_COUNT);

  const isMoreAvailable = projectsData.length > DEFAULT_PROJECTS_COUNT && !showAll;
  const isViewLessAvailable = showAll;

  return (
    // ⬅️ FIX 1: Apply dark mode colors to the main container background
    <div className="bg-gradient-to-b from-white via-primary/5 to-transparent dark:from-dark dark:via-dark/95 dark:to-dark" id="projects">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        {/* === Header Section (Ensure Text is Dark Mode Ready) === */}
        <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">
            Featured Work
          </p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl"> {/* ⬅️ FIX 2: Dark text for dark mode */}
            My Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 sm:text-xl"> {/* ⬅️ FIX 3: Dark text for dark mode */}
            A collection of the software I’ve designed, developed, and deployed.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsToShow.map((project, index) => (
            <ProjectCard  key={project.id || index} {...project} /> 
          ))}
        </div>

        {/* === Conditional Buttons (Styling Updated for Dark Mode) === */}
        <div className="mt-12 flex justify-center gap-4">
            {/* 1. View All Button (Primary/Accent Style - already fine) */}
            {isMoreAvailable && (
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2"
              >
                View All Projects <ArrowRight size={18} />
              </button>
            )}

            {/* 2. View Less Button (Secondary/Outline Style) */}
            {isViewLessAvailable && (
              <button
                onClick={() => {
                  setShowAll(false);
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                // ⬅️ FIX 4: Ensured borders and backgrounds are correct in dark mode
                className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:border-primary hover:text-primary transition-colors flex items-center gap-2 shadow-md"
              >
                <ArrowLeft size={18} /> View Less
              </button>
            )}
        </div>
        
      </section>
    </div>
  );
}