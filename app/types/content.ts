/**
 * Content management TypeScript interfaces and types
 * Requirements: 2.5, 2.6
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  highlights: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

export interface ProjectInput {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  highlights: string[];
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  proficiency: number; // 1-100
  yearsOfExperience: number;
  order: number;
  isVisible: boolean;
}

export interface Experience {
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

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  order: number;
  isVisible: boolean;
}

export interface ContentState {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  certificates: Certificate[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface UploadResponse {
  success: boolean;
  data: {
    url: string;
    filename: string;
    size: number;
  };
}