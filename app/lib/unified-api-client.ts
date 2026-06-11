/**
 * Unified API Client with automatic fallback
 * Tries backend first, falls back to local storage if unavailable
 */

import { apiClient } from './api-client';
import { localApiClient } from './local-api-client';
import { Project, ProjectInput, Skill, Experience, Certificate } from '@/types';
import { LocalStorageHelper, STORAGE_KEYS } from '@/data/seedData';

class UnifiedApiClient {
  private isBackendAvailable: boolean | null = null;
  private checkingBackend: Promise<boolean> | null = null;

  /**
   * Check if backend is available
   */
  private async checkBackendAvailability(): Promise<boolean> {
    // If we're already checking, return that promise
    if (this.checkingBackend) {
      return this.checkingBackend;
    }

    // Start new check
    this.checkingBackend = (async () => {
      try {
        // Try a simple request with short timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portifolio-backend-ptck.onrender.com'}/api/projects`, {
          signal: controller.signal,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        clearTimeout(timeoutId);
        this.isBackendAvailable = response.ok;
        console.log(`Backend availability: ${this.isBackendAvailable ? 'ONLINE' : 'OFFLINE'}`);
        
        return this.isBackendAvailable;
      } catch (error) {
        console.warn('Backend unavailable, using local storage fallback');
        this.isBackendAvailable = false;
        return false;
      } finally {
        this.checkingBackend = null;
      }
    })();

    return this.checkingBackend;
  }

  /**
   * Execute with automatic fallback
   */
  private async withFallback<T>(
    backendFn: () => Promise<T>,
    localFn: () => Promise<T>,
    saveToLocal?: (data: T) => void,
    fallbackName: string = 'data'
  ): Promise<T> {
    try {
      // Try backend first with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
      
      const dataPromise = backendFn();
      const data = await Promise.race([
        dataPromise,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Backend timeout')), 8000)
        )
      ]);
      
      clearTimeout(timeoutId);
      
      // Save to local storage for offline access
      if (saveToLocal && data) {
        try {
          saveToLocal(data);
          console.log(`✅ Cached ${fallbackName} from backend to local storage`);
        } catch (storageError) {
          console.warn('Failed to cache data:', storageError);
        }
      }
      
      this.isBackendAvailable = true;
      return data;
    } catch (error) {
      console.warn(`⚠️ Backend request failed for ${fallbackName}, using seed/local data:`, error instanceof Error ? error.message : error);
      
      // Mark backend as unavailable
      this.isBackendAvailable = false;
      
      // Fallback to local storage or seed data
      try {
        const fallbackData = await localFn();
        console.log(`✅ Using local/seed data for ${fallbackName} (${Array.isArray(fallbackData) ? fallbackData.length + ' items' : 'data loaded'})`);
        return fallbackData;
      } catch (fallbackError) {
        console.error(`❌ Fallback also failed for ${fallbackName}:`, fallbackError);
        throw new Error(`Both backend and fallback failed for ${fallbackName}`);
      }
    }
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.withFallback(
      () => apiClient.getProjects(),
      () => localApiClient.getProjects(),
      (data) => LocalStorageHelper.saveToStorage(STORAGE_KEYS.PROJECTS, data),
      'projects'
    );
  }

  async getProject(id: string): Promise<Project> {
    return this.withFallback(
      () => apiClient.getProject(id),
      () => localApiClient.getProject(id),
      undefined,
      'project'
    );
  }

  async createProject(project: ProjectInput): Promise<Project> {
    return this.withFallback(
      () => apiClient.createProject(project),
      () => localApiClient.createProject(project),
      undefined,
      'create project'
    );
  }

  async updateProject(id: string, project: Partial<ProjectInput>): Promise<Project> {
    return this.withFallback(
      () => apiClient.updateProject(id, project),
      () => localApiClient.updateProject(id, project),
      undefined,
      'update project'
    );
  }

  async deleteProject(id: string): Promise<void> {
    return this.withFallback(
      () => apiClient.deleteProject(id),
      () => localApiClient.deleteProject(id),
      undefined,
      'delete project'
    );
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return this.withFallback(
      () => apiClient.getSkills(),
      () => localApiClient.getSkills(),
      (data) => LocalStorageHelper.saveToStorage(STORAGE_KEYS.SKILLS, data),
      'skills'
    );
  }

  async createSkill(skill: Partial<Skill>): Promise<Skill> {
    return this.withFallback(
      () => apiClient.createSkill(skill),
      () => localApiClient.createSkill(skill),
      undefined,
      'create skill'
    );
  }

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
    return this.withFallback(
      () => apiClient.updateSkill(id, skill),
      () => localApiClient.updateSkill(id, skill),
      undefined,
      'update skill'
    );
  }

  async deleteSkill(id: string): Promise<void> {
    return this.withFallback(
      () => apiClient.deleteSkill(id),
      () => localApiClient.deleteSkill(id),
      undefined,
      'delete skill'
    );
  }

  // Experience
  async getExperience(): Promise<Experience[]> {
    return this.withFallback(
      () => apiClient.getExperience(),
      () => localApiClient.getExperience(),
      (data) => LocalStorageHelper.saveToStorage(STORAGE_KEYS.EXPERIENCE, data),
      'experience'
    );
  }

  async createExperience(experience: Partial<Experience>): Promise<Experience> {
    return this.withFallback(
      () => apiClient.createExperience(experience),
      () => localApiClient.createExperience(experience),
      undefined,
      'create experience'
    );
  }

  async updateExperience(id: string, experience: Partial<Experience>): Promise<Experience> {
    return this.withFallback(
      () => apiClient.updateExperience(id, experience),
      () => localApiClient.updateExperience(id, experience),
      undefined,
      'update experience'
    );
  }

  async deleteExperience(id: string): Promise<void> {
    return this.withFallback(
      () => apiClient.deleteExperience(id),
      () => localApiClient.deleteExperience(id),
      undefined,
      'delete experience'
    );
  }

  // Certificates
  async getCertificates(): Promise<Certificate[]> {
    return this.withFallback(
      () => apiClient.getCertificates(),
      () => localApiClient.getCertificates(),
      (data) => LocalStorageHelper.saveToStorage(STORAGE_KEYS.CERTIFICATES, data),
      'certificates'
    );
  }

  async createCertificate(certificate: Partial<Certificate>): Promise<Certificate> {
    return this.withFallback(
      () => apiClient.createCertificate(certificate),
      () => localApiClient.createCertificate(certificate),
      undefined,
      'create certificate'
    );
  }

  async updateCertificate(id: string, certificate: Partial<Certificate>): Promise<Certificate> {
    return this.withFallback(
      () => apiClient.updateCertificate(id, certificate),
      () => localApiClient.updateCertificate(id, certificate),
      undefined,
      'update certificate'
    );
  }

  async deleteCertificate(id: string): Promise<void> {
    return this.withFallback(
      () => apiClient.deleteCertificate(id),
      () => localApiClient.deleteCertificate(id),
      undefined,
      'delete certificate'
    );
  }

  // Utility methods
  async forceLocalMode(): Promise<void> {
    this.isBackendAvailable = false;
    LocalStorageHelper.setLocalMode(true);
  }

  async resetBackendCheck(): Promise<void> {
    this.isBackendAvailable = null;
    LocalStorageHelper.setLocalMode(false);
  }

  getBackendStatus(): boolean | null {
    return this.isBackendAvailable;
  }
}

// Export singleton
export const unifiedApiClient = new UnifiedApiClient();
