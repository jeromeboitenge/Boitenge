export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  technologies: string[];
  achievements: string[];
  order: number;
  isVisible: boolean;
}

export const experienceData: ExperienceData[] = [
  {
    id: '1',
    company: 'University of Rwanda',
    position: 'Full-Stack Developer',
    description: 'Developed and maintained the HitamoSpace event management platform, handling 25K+ concurrent users for university events.',
    startDate: new Date('2022-01-01'),
    endDate: undefined,
    technologies: ['React', 'Next.js', 'MongoDB', 'Prisma'],
    achievements: ['Scaled platform to 25K+ users', 'Implemented QR verification system', 'Reduced booking time by 40%'],
    order: 1,
    isVisible: true
  },
  {
    id: '2',
    company: 'Freelance',
    position: 'Frontend Developer',
    description: 'Built responsive web applications for various clients, focusing on modern UI/UX and performance optimization.',
    startDate: new Date('2021-06-01'),
    endDate: new Date('2021-12-31'),
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    achievements: ['Delivered 10+ projects', 'Improved client satisfaction by 95%', 'Reduced load times by 50%'],
    order: 2,
    isVisible: true
  },
  {
    id: '3',
    company: 'Tech Solutions Rwanda',
    position: 'System Analyst & Hardware Technician',
    description: 'Provided hardware maintenance, system analysis, and technical support for enterprise clients.',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2021-05-31'),
    technologies: ['Windows Server', 'Linux', 'Networking'],
    achievements: ['Maintained 99% uptime', 'Resolved 500+ technical issues', 'Trained 20+ staff members'],
    order: 3,
    isVisible: true
  }
];
