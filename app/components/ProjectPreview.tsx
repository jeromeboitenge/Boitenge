import ProjectCard from "./ProjectCard";
import { projectsData } from "../data/projectsData";

export default function ProjectPreview() {
  const previewProjects = projectsData.slice(0, 3);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {previewProjects.map(({ id, ...project }) => (
        <ProjectCard key={id} {...project} />
      ))}
    </div>
  );
}
