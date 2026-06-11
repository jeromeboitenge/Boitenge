/**
 * Generate seed data from current database
 * Run with: npx ts-node scripts/generate-seed-data.ts
 */

import { apiClient } from '../app/lib/api-client';

async function generateSeedData() {
  console.log('🔄 Fetching data from backend...');
  
  try {
    const [projects, skills, experience, certificates] = await Promise.all([
      apiClient.getProjects(),
      apiClient.getSkills(),
      apiClient.getExperience(),
      apiClient.getCertificates(),
    ]);

    console.log('✅ Data fetched successfully:');
    console.log(`   - ${projects.length} projects`);
    console.log(`   - ${skills.length} skills`);
    console.log(`   - ${experience.length} experiences`);
    console.log(`   - ${certificates.length} certificates`);

    const seedFileContent = `/**
 * Seed Data for Portfolio
 * Auto-generated from database on ${new Date().toISOString()}
 */

import { Project, Skill, Experience, Certificate } from '@/types';

export const seedProjects: Project[] = ${JSON.stringify(projects, null, 2)};

export const seedSkills: Skill[] = ${JSON.stringify(skills, null, 2)};

export const seedExperience: Experience[] = ${JSON.stringify(experience, null, 2)};

export const seedCertificates: Certificate[] = ${JSON.stringify(certificates, null, 2)};

// Local storage keys
export const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects',
  SKILLS: 'portfolio_skills',
  EXPERIENCE: 'portfolio_experience',
  CERTIFICATES: 'portfolio_certificates',
  LAST_SYNC: 'portfolio_last_sync',
  USE_LOCAL: 'portfolio_use_local'
};

// Helper functions for local storage operations
export const LocalStorageHelper = {
  saveToStorage<T>(key: string, data: T): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
      }
    } catch (error) {
      console.error(\`Failed to save to localStorage (\${key}):\`, error);
    }
  },

  loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        if (stored) {
          return JSON.parse(stored) as T;
        }
      }
    } catch (error) {
      console.error(\`Failed to load from localStorage (\${key}):\`, error);
    }
    return defaultValue;
  },

  initializeStorage(): void {
    if (typeof window === 'undefined') return;

    const hasProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    
    if (!hasProjects) {
      console.log('Initializing local storage with seed data...');
      this.saveToStorage(STORAGE_KEYS.PROJECTS, seedProjects);
      this.saveToStorage(STORAGE_KEYS.SKILLS, seedSkills);
      this.saveToStorage(STORAGE_KEYS.EXPERIENCE, seedExperience);
      this.saveToStorage(STORAGE_KEYS.CERTIFICATES, seedCertificates);
      console.log('Seed data initialized successfully');
    }
  },

  clearStorage(): void {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  },

  isUsingLocal(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.USE_LOCAL) === 'true';
  },

  setLocalMode(useLocal: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USE_LOCAL, String(useLocal));
    }
  }
};

export const transformStoredData = {
  projects(data: any[]): Project[] {
    return data.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    }));
  },

  experience(data: any[]): Experience[] {
    return data.map(item => ({
      ...item,
      startDate: new Date(item.startDate),
      endDate: item.endDate ? new Date(item.endDate) : undefined
    }));
  },

  certificates(data: any[]): Certificate[] {
    return data.map(item => ({
      ...item,
      issueDate: new Date(item.issueDate),
      expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined
    }));
  }
};
`;

    // Write to file
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../app/data/seedData.ts');
    
    fs.writeFileSync(filePath, seedFileContent, 'utf-8');
    
    console.log('\n✅ Seed data file generated successfully!');
    console.log(`📁 File: ${filePath}`);
    console.log('\n🎉 Your seed data now matches your database!');
    
  } catch (error) {
    console.error('❌ Error generating seed data:', error);
    process.exit(1);
  }
}

generateSeedData();
