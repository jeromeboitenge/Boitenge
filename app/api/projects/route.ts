import { NextResponse } from 'next/server';
import { seedProjects } from '../../data/seedData';
import { isPlaceholderProjectUrl } from '../../lib/project-links';

export async function GET() {
  const projects = seedProjects
    .filter((project) => project.isPublished && !isPlaceholderProjectUrl(project.liveUrl))
    .sort((a, b) => a.order - b.order);

  return NextResponse.json(projects);
}
