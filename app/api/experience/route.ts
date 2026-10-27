import { NextResponse } from 'next/server';
import { seedExperience } from '../../data/seedData';

export async function GET() {
  const experiences = seedExperience
    .filter((experience) => experience.isVisible)
    .map((experience) => ({
      id: experience.id,
      position: experience.position,
      company: experience.company,
      startDate: experience.startDate.toISOString(),
      endDate: experience.endDate?.toISOString(),
      description: experience.description,
      points: experience.achievements,
      order: experience.order,
    }))
    .sort((a, b) => b.order - a.order);

  return NextResponse.json(experiences);
}
