import { NextResponse } from 'next/server';
import { skillsData } from '../../data/skillsData';

export async function GET() {
  const skills = skillsData.map(skill => ({
    id: skill.id,
    title: skill.name,
    category: skill.category.charAt(0).toUpperCase() + skill.category.slice(1),
    level: skill.proficiency >= 80 ? 'Expert' : skill.proficiency >= 60 ? 'Intermediate' : 'Beginner',
    yearsExperience: skill.yearsOfExperience,
    proficiency: skill.proficiency,
    isActive: skill.isVisible,
    order: skill.order,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  return NextResponse.json(skills);
}
