export interface SkillData {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  yearsOfExperience: number;
  order: number;
  isVisible: boolean;
}

export const skillsData: SkillData[] = [
  // Frontend
  { id: '1', name: 'React', category: 'frontend', proficiency: 90, yearsOfExperience: 3, order: 1, isVisible: true },
  { id: '2', name: 'Next.js', category: 'frontend', proficiency: 85, yearsOfExperience: 2, order: 2, isVisible: true },
  { id: '3', name: 'Tailwind CSS', category: 'frontend', proficiency: 95, yearsOfExperience: 3, order: 3, isVisible: true },
  { id: '4', name: 'HTML', category: 'frontend', proficiency: 95, yearsOfExperience: 4, order: 4, isVisible: true },
  { id: '5', name: 'CSS', category: 'frontend', proficiency: 90, yearsOfExperience: 4, order: 5, isVisible: true },
  
  // Backend
  { id: '6', name: 'Node.js', category: 'backend', proficiency: 85, yearsOfExperience: 3, order: 6, isVisible: true },
  { id: '7', name: 'Express.js', category: 'backend', proficiency: 80, yearsOfExperience: 3, order: 7, isVisible: true },
  { id: '8', name: 'NestJS', category: 'backend', proficiency: 75, yearsOfExperience: 2, order: 8, isVisible: true },
  
  // Database
  { id: '9', name: 'MongoDB', category: 'database', proficiency: 85, yearsOfExperience: 3, order: 9, isVisible: true },
  { id: '10', name: 'MySQL', category: 'database', proficiency: 80, yearsOfExperience: 2, order: 10, isVisible: true },
  { id: '11', name: 'Prisma', category: 'database', proficiency: 75, yearsOfExperience: 2, order: 11, isVisible: true },
  
  // Tools
  { id: '12', name: 'Git', category: 'tools', proficiency: 90, yearsOfExperience: 4, order: 12, isVisible: true },
  { id: '13', name: 'Postman', category: 'tools', proficiency: 85, yearsOfExperience: 3, order: 13, isVisible: true },
  { id: '14', name: 'VS Code', category: 'tools', proficiency: 95, yearsOfExperience: 4, order: 14, isVisible: true },
  { id: '15', name: 'Ubuntu Linux', category: 'tools', proficiency: 80, yearsOfExperience: 3, order: 15, isVisible: true },
];
