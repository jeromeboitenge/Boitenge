import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projectsData';

export default function ProjectsPage() {
  return (
    <div className="bg-gradient-to-b from-white via-primary/5 to-transparent" id="projects">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">
            Featured Work
          </p>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">My Projects</h1>
          <p className="text-lg text-slate-600 sm:text-xl">
            A collection of the software I’ve designed, developed, and deployed.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.slice(0, 3).map(({ id, ...project }) => (
            <ProjectCard key={id} {...project} />
          ))}
        </div>
      </section>
    </div>
  );
}
