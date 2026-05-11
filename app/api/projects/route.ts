import { NextResponse } from 'next/server';
import { projectsData } from '../../data/projectsData';

export async function GET() {
  const projects = projectsData.map(project => ({
    id: project.id.toString(),
    title: project.title,
    description: project.description,
    technologies: project.tags,
    liveUrl: project.demoLink,
    imageUrl: project.image,
    highlights: project.highlights,
    order: project.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  return NextResponse.json(projects);
}
