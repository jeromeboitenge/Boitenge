import { NextResponse } from 'next/server';
import { projectsData } from '../../data/projectsData';

export async function GET() {
  return NextResponse.json(projectsData);
}
