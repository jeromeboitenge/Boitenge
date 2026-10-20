"use client";

import { useEffect, useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { unifiedApiClient } from '@/lib/unified-api-client';
import { Project } from '@/types';

// Define the number of projects to show by default
const DEFAULT_PROJECTS_COUNT = 3;

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await unifiedApiClient.getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Showing cached data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const projectsToShow = useMemo(() => {
    return showAll ? projects : projects.slice(0, DEFAULT_PROJECTS_COUNT);
  }, [showAll, projects]);

  const defaultVisibleCount = Math.min(DEFAULT_PROJECTS_COUNT, projects.length);
  const currentVisibleCount = showAll ? projects.length : defaultVisibleCount;
  const isMoreAvailable = projects.length > currentVisibleCount && !showAll;
  const isViewLessAvailable = showAll;

  return (
    <div className="border-y border-slate-200/80 bg-white/40 dark:border-slate-800 dark:bg-slate-900/20" id="projects">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">Selected work</p>
            <h2 className="font-display text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
              Products built to solve real problems.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
              A closer look at the interfaces, systems, and decisions behind my work.
            </p>
          </div>
          <p className="shrink-0 text-sm font-medium text-slate-500 dark:text-slate-400">
            Showing {currentVisibleCount} of {projects.length} projects
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center" role="status" aria-live="polite">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-r-transparent"></div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <>
            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectsToShow.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.imageUrl || '/hotel.png'}
                  tags={project.technologies}
                  highlights={project.highlights}
                  demoLink={project.liveUrl || '#'}
                  codeLink={project.githubUrl}
                />
              ))}
            </div>

            {/* View More/Less Buttons */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {isMoreAvailable && (
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex min-h-11 items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Show all projects <ArrowRight size={17} />
                </button>
              )}

              {isViewLessAvailable && (
                <button
                  onClick={() => {
                    setShowAll(false);
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200"
                >
                  <ArrowLeft size={17} /> Show fewer
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
