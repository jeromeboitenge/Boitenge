/**
 * Sync seed data from current database
 * Run with: node scripts/sync-seed-data.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portifolio-backend-ptck.onrender.com';

function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    const url = `${BACKEND_URL}${endpoint}`;
    console.log(`Fetching: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error(`Failed to parse JSON from ${endpoint}: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Request failed for ${endpoint}: ${error.message}`));
    });
  });
}

async function syncSeedData() {
  console.log('🔄 Syncing seed data from backend...\n');
  
  try {
    // Fetch all data
    const [projectsRaw, skillsRaw, experienceRaw, certificatesRaw] = await Promise.all([
      fetchData('/api/projects'),
      fetchData('/api/skills'),
      fetchData('/api/experience'),
      fetchData('/api/certificates'),
    ]);

    // Transform backend data to match our frontend types
    const projects = projectsRaw.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      technologies: p.technologies || [],
      githubUrl: undefined,
      liveUrl: p.liveUrl,
      imageUrl: p.imageUrl,
      highlights: p.highlights || [],
      order: p.order || 0,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
      isPublished: true
    }));

    const skills = skillsRaw.map(s => ({
      id: s.id,
      name: s.title,
      category: s.category?.toLowerCase() || 'other',
      proficiency: s.proficiency || 50,
      yearsOfExperience: s.yearsExperience || 0,
      order: s.order || 0,
      isVisible: s.isActive !== false
    }));

    const experience = experienceRaw.map(e => ({
      id: e.id,
      company: e.company,
      position: e.position,
      description: e.description,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : undefined,
      technologies: [],
      achievements: e.points || [],
      order: e.order || 0,
      isVisible: true
    }));

    const certificates = certificatesRaw.map(c => ({
      id: c.id,
      name: c.title,
      issuer: c.issuer,
      issueDate: new Date(c.date),
      expiryDate: undefined,
      credentialId: undefined,
      credentialUrl: c.url,
      imageUrl: c.url,
      description: c.description,
      skills: c.skills || [],
      order: c.order || 0,
      isVisible: true
    }));

    console.log('✅ Data fetched successfully:');
    console.log(`   - ${projects.length} projects`);
    console.log(`   - ${skills.length} skills`);
    console.log(`   - ${experience.length} experiences`);
    console.log(`   - ${certificates.length} certificates\n`);

    // Generate the seed file content
    const seedFileContent = `/**
 * Seed Data for Portfolio
 * Auto-generated from database on ${new Date().toISOString()}
 * DO NOT EDIT MANUALLY - Run 'node scripts/sync-seed-data.js' to update
 */

import { Project, Skill, Experience, Certificate } from '@/types';

export const seedProjects: Project[] = ${JSON.stringify(projects, null, 2).replace(/"createdAt":"([^"]+)"/g, 'createdAt: new Date("$1")').replace(/"updatedAt":"([^"]+)"/g, 'updatedAt: new Date("$1")').replace(/"startDate":"([^"]+)"/g, 'startDate: new Date("$1")').replace(/"endDate":"([^"]+)"/g, 'endDate: new Date("$1")').replace(/"issueDate":"([^"]+)"/g, 'issueDate: new Date("$1")')};

export const seedSkills: Skill[] = ${JSON.stringify(skills, null, 2)};

export const seedExperience: Experience[] = ${JSON.stringify(experience, null, 2).replace(/"startDate":"([^"]+)"/g, 'startDate: new Date("$1")').replace(/"endDate":"([^"]+)"/g, 'endDate: new Date("$1")')};

export const seedCertificates: Certificate[] = ${JSON.stringify(certificates, null, 2).replace(/"issueDate":"([^"]+)"/g, 'issueDate: new Date("$1")')};

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
    const filePath = path.join(__dirname, '../app/data/seedData.ts');
    fs.writeFileSync(filePath, seedFileContent, 'utf-8');
    
    console.log('✅ Seed data file updated successfully!');
    console.log(`📁 File: ${filePath}`);
    console.log('\n🎉 Your seed data now matches your database!');
    console.log('💡 Commit this file to ensure production has latest data.\n');
    
  } catch (error) {
    console.error('\n❌ Error syncing seed data:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Make sure your backend is running');
    console.error('  2. Check NEXT_PUBLIC_BACKEND_API_URL in .env.local');
    console.error('  3. Verify the API endpoints are accessible\n');
    process.exit(1);
  }
}

syncSeedData();
