/**
 * Local API Client with storage fallback
 * Automatically uses local storage when backend is unavailable
 */

import { 
  Project, 
  ProjectInput, 
  Skill, 
  Experience, 
  Certificate 
} from '@/types';
import {
  seedProjects,
  seedSkills,
  seedExperience,
  seedCertificates,
  LocalStorageHelper,
  STORAGE_KEYS,
  transformStoredData
} from '@/data/seedData';

class LocalApiClient {
  constructor() {
    // Initialize storage on creation
    if (typeof window !== 'undefined') {
      LocalStorageHelper.initializeStorage();
    }
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    const stored = LocalStorageHelper.loadFromStorage(STORAGE_KEYS.PROJECTS, seedProjects);
    return transformStoredData.projects(stored);
  }

  async getProject(id: string): Promise<Project> {
    const projects = await this.getProjects();
    const project = projects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async createProject(project: ProjectInput): Promise<Project> {
    const projects = await this.getProjects();
    const newProject: Project = {
      id: `local-${Date.now()}`,
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: project.isPublished ?? true
    };
    
    const updated = [...projects, newProject];
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.PROJECTS, updated);
    
    return newProject;
  }

  async updateProject(id: string, project: Partial<ProjectInput>): Promise<Project> {
    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Project not found');
    }

    const updatedProject: Project = {
      ...projects[index],
      ...project,
      updatedAt: new Date()
    };

    projects[index] = updatedProject;
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.PROJECTS, projects);
    
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    const projects = await this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.PROJECTS, filtered);
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return LocalStorageHelper.loadFromStorage(STORAGE_KEYS.SKILLS, seedSkills);
  }

  async createSkill(skill: Partial<Skill>): Promise<Skill> {
    const skills = await this.getSkills();
    const newSkill: Skill = {
      id: `local-${Date.now()}`,
      name: skill.name || '',
      category: skill.category || 'other',
      proficiency: skill.proficiency || 50,
      yearsOfExperience: skill.yearsOfExperience || 0,
      order: skill.order || skills.length + 1,
      isVisible: skill.isVisible ?? true
    };
    
    const updated = [...skills, newSkill];
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.SKILLS, updated);
    
    return newSkill;
  }

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
    const skills = await this.getSkills();
    const index = skills.findIndex(s => s.id === id);
    
    if (index === -1) {
      throw new Error('Skill not found');
    }

    const updatedSkill: Skill = {
      ...skills[index],
      ...skill
    };

    skills[index] = updatedSkill;
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.SKILLS, skills);
    
    return updatedSkill;
  }

  async deleteSkill(id: string): Promise<void> {
    const skills = await this.getSkills();
    const filtered = skills.filter(s => s.id !== id);
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.SKILLS, filtered);
  }

  // Experience
  async getExperience(): Promise<Experience[]> {
    const stored = LocalStorageHelper.loadFromStorage(STORAGE_KEYS.EXPERIENCE, seedExperience);
    return transformStoredData.experience(stored);
  }

  async createExperience(experience: Partial<Experience>): Promise<Experience> {
    const experiences = await this.getExperience();
    const newExperience: Experience = {
      id: `local-${Date.now()}`,
      company: experience.company || '',
      position: experience.position || '',
      description: experience.description || '',
      startDate: experience.startDate || new Date(),
      endDate: experience.endDate,
      technologies: experience.technologies || [],
      achievements: experience.achievements || [],
      order: experience.order || experiences.length + 1,
      isVisible: experience.isVisible ?? true
    };
    
    const updated = [...experiences, newExperience];
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.EXPERIENCE, updated);
    
    return newExperience;
  }

  async updateExperience(id: string, experience: Partial<Experience>): Promise<Experience> {
    const experiences = await this.getExperience();
    const index = experiences.findIndex(e => e.id === id);
    
    if (index === -1) {
      throw new Error('Experience not found');
    }

    const updatedExperience: Experience = {
      ...experiences[index],
      ...experience
    };

    experiences[index] = updatedExperience;
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.EXPERIENCE, experiences);
    
    return updatedExperience;
  }

  async deleteExperience(id: string): Promise<void> {
    const experiences = await this.getExperience();
    const filtered = experiences.filter(e => e.id !== id);
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.EXPERIENCE, filtered);
  }

  // Certificates
  async getCertificates(): Promise<Certificate[]> {
    const stored = LocalStorageHelper.loadFromStorage(STORAGE_KEYS.CERTIFICATES, seedCertificates);
    return transformStoredData.certificates(stored);
  }

  async createCertificate(certificate: Partial<Certificate>): Promise<Certificate> {
    const certificates = await this.getCertificates();
    const newCertificate: Certificate = {
      id: `local-${Date.now()}`,
      name: certificate.name || '',
      issuer: certificate.issuer || '',
      issueDate: certificate.issueDate || new Date(),
      expiryDate: certificate.expiryDate,
      credentialId: certificate.credentialId,
      credentialUrl: certificate.credentialUrl,
      imageUrl: certificate.imageUrl,
      description: certificate.description,
      skills: certificate.skills || [],
      order: certificate.order || certificates.length + 1,
      isVisible: certificate.isVisible ?? true
    };
    
    const updated = [...certificates, newCertificate];
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.CERTIFICATES, updated);
    
    return newCertificate;
  }

  async updateCertificate(id: string, certificate: Partial<Certificate>): Promise<Certificate> {
    const certificates = await this.getCertificates();
    const index = certificates.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new Error('Certificate not found');
    }

    const updatedCertificate: Certificate = {
      ...certificates[index],
      ...certificate
    };

    certificates[index] = updatedCertificate;
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.CERTIFICATES, certificates);
    
    return updatedCertificate;
  }

  async deleteCertificate(id: string): Promise<void> {
    const certificates = await this.getCertificates();
    const filtered = certificates.filter(c => c.id !== id);
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.CERTIFICATES, filtered);
  }

  async createCertificate(certificate: Partial<Certificate>): Promise<Certificate> {
    const certificates = await this.getCertificates();
    const newCertificate: Certificate = {
      id: `local-${Date.now()}`,
      name: certificate.name || '',
      issuer: certificate.issuer || '',
      issueDate: certificate.issueDate || new Date(),
      expiryDate: certificate.expiryDate,
      credentialId: certificate.credentialId,
      credentialUrl: certificate.credentialUrl,
      imageUrl: certificate.imageUrl,
      description: certificate.description,
      skills: certificate.skills || [],
      order: certificate.order || certificates.length + 1,
      isVisible: certificate.isVisible ?? true
    };
    
    const updated = [...certificates, newCertificate];
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.CERTIFICATES, updated);
    
    return newCertificate;
  }

  // Utility methods
  clearAllData(): void {
    LocalStorageHelper.clearStorage();
  }

  resetToSeedData(): void {
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.PROJECTS, seedProjects);
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.SKILLS, seedSkills);
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.EXPERIENCE, seedExperience);
    LocalStorageHelper.saveToStorage(STORAGE_KEYS.CERTIFICATES, seedCertificates);
  }

  getDataStats() {
    return {
      projects: this.getProjects().then(p => p.length),
      skills: this.getSkills().then(s => s.length),
      experience: this.getExperience().then(e => e.length),
      certificates: this.getCertificates().then(c => c.length)
    };
  }
}

export const localApiClient = new LocalApiClient();
