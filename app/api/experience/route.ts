import { NextResponse } from 'next/server';
import { experienceData } from '../../data/experienceData';

export async function GET() {
  const experiences = experienceData.map(exp => ({
    id: exp.id,
    position: exp.position,
    company: exp.company,
    startDate: exp.startDate.toISOString(),
    endDate: exp.endDate?.toISOString(),
    description: exp.description,
    points: exp.achievements,
    order: exp.order
  }));

  return NextResponse.json(experiences);
}
