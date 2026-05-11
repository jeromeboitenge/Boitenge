"use client";

import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
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
        const data = await apiClient.getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const defaultVisibleCount = Math.min(DEFAULT_PROJECTS_COUNT, projects.length);
  const currentVisibleCount = showAll ? projects.length : defaultVisibleCount;
  const projectsToShow = showAll ? projects : projects.slice(0, DEFAULT_PROJECTS_COUNT);

  const isMoreAvailable = projects.length > currentVisibleCount && !showAll;
  const isViewLessAvailable = showAll;

  return (
    <div className="bg-gradient-to-b from-white via-primary/5 to-transparent dark:from-dark dark:via-dark/95 dark:to-dark" id="projects">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-7xl space-y-6 text-center animate-fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">
            Featured Work
          </p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            My Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 sm:text-xl">
            A collection of the software I've designed, developed, and deployed.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            <span>Showing {currentVisibleCount} of {projects.length} projects</span>
            {isMoreAvailable && <span className="font-semibold text-primary">Browse more projects below</span>}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-16 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-16 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                />
              ))}
            </div>

            {/* View More/Less Buttons */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {isMoreAvailable && (
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2"
                >
                  View More Projects <ArrowRight size={18} />
                </button>
              )}

              {isViewLessAvailable && (
                <button
                  onClick={() => {
                    setShowAll(false);
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:border-primary hover:text-primary transition-colors flex items-center gap-2 shadow-md"
                >
                  <ArrowLeft size={18} /> View Less
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
