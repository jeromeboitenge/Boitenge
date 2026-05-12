/**
 * API Client for backend communication
 * Requirements: 5.1, 5.2, 5.5
 */

import { 
  ApiClient, 
  LoginCredentials, 
  AuthResponse, 
  Project, 
  ProjectInput, 
  Skill, 
  Experience, 
  Certificate, 
  UploadResponse,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  Profile,
  ProfileInput
} from '@/types';

class ApiClientImpl implements ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private useLocalFallback: boolean = false;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portifolio-backend-ptck.onrender.com') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      // Add timeout for backend requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      return await response.json();
    } catch (error) {
      // If backend fails or times out, try local API as fallback
      if (!this.useLocalFallback && this.baseUrl !== '/api') {
        console.warn('Backend unavailable or timeout, falling back to local API');
        this.useLocalFallback = true;
        const localUrl = `/api${endpoint}`;
        
        try {
          const localResponse = await fetch(localUrl, {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              ...(options.headers as Record<string, string> || {}),
            },
          });
          
          if (localResponse.ok) {
            return await localResponse.json();
          }
        } catch (localError) {
          console.error('Local API also failed:', localError);
        }
      }
      
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'Unknown error occurred' };
    }

    const message = errorData.error?.message || errorData.message || 'Request failed';

    switch (response.status) {
      case 400:
        throw new ValidationError(message, errorData.error?.details);
      case 401:
        throw new AuthenticationError(message);
      case 403:
        throw new AuthorizationError(message);
      default:
        throw new Error(message);
    }
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  useLocalApi(): void {
    this.baseUrl = '/api';
    this.useLocalFallback = true;
  }

  // Authentication methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<{
      access_token: string;
      user: {
        id: string;
        email: string;
        role: string;
      };
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.access_token) {
      this.setToken(response.access_token);
    }

    const refreshToken = (response as { refresh_token?: string }).refresh_token || '';

    // Transform to match our AuthResponse interface
    return {
      success: true,
      data: {
        token: response.access_token,
        refreshToken,
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.email.split('@')[0], // Extract name from email for now
          role: response.user.role.toLowerCase() as 'admin' | 'owner'
        }
      }
    };
  }

  async signup(userData: {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
  }): Promise<AuthResponse> {
    const response = await this.request<{
      access_token: string;
      user: {
        id: string;
        email: string;
        name: string;
        phoneNumber?: string;
        role: string;
      };
    }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.access_token) {
      this.setToken(response.access_token);
    }

    const refreshToken = (response as { refresh_token?: string }).refresh_token || '';

    return {
      success: true,
      data: {
        token: response.access_token,
        refreshToken,
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          role: response.user.role.toLowerCase() as 'admin' | 'owner'
        }
      }
    };
  }

  async getCurrentUser(): Promise<{
    id: string;
    email: string;
    role: string;
    createdAt: string;
  }> {
    return await this.request<{
      id: string;
      email: string;
      role: string;
      createdAt: string;
    }>('/api/auth/me');
  }

  async logout(): Promise<void> {
    // Backend doesn't seem to have logout endpoint, just clear token locally
    this.setToken(null);
  }

  async refreshToken(): Promise<AuthResponse> {
    // Try to get current user to validate token
    try {
      const user = await this.getCurrentUser();
      return {
        success: true,
        data: {
          token: this.token || '',
          refreshToken: '',
          user: {
            id: user.id,
            email: user.email,
            name: user.email.split('@')[0],
            role: user.role.toLowerCase() as 'admin' | 'owner'
          }
        }
      };
    } catch (error) {
      throw new AuthenticationError('Token refresh failed');
    }
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    const projects = await this.request<Array<{
      id: string;
      title: string;
      description: string;
      technologies: string[];
      liveUrl?: string;
      imageUrl?: string;
      highlights: string[];
      order: number;
      createdAt: string;
      updatedAt: string;
    }>>('/api/projects');

    // Transform to match our Project interface
    return projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      githubUrl: undefined, // Backend doesn't have githubUrl
      liveUrl: project.liveUrl,
      imageUrl: project.imageUrl,
      highlights: project.highlights,
      order: project.order,
      createdAt: new Date(project.createdAt),
      updatedAt: new Date(project.updatedAt),
      isPublished: true // Assume all returned projects are published
    }));
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
    const response = await this.request<{
      id: string;
      title: string;
      description: string;
      technologies: string[];
      liveUrl?: string;
      imageUrl?: string;
      highlights: string[];
      order: number;
      createdAt: string;
      updatedAt: string;
    }>('/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        liveUrl: project.liveUrl,
        imageUrl: project.imageUrl,
        highlights: project.highlights,
        order: project.order
      }),
    });

    return {
      id: response.id,
      title: response.title,
      description: response.description,
      technologies: response.technologies,
      githubUrl: project.githubUrl,
      liveUrl: response.liveUrl,
      imageUrl: response.imageUrl,
      highlights: response.highlights,
      order: response.order,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
      isPublished: true
    };
  }

  async updateProject(id: string, project: Partial<ProjectInput>): Promise<Project> {
    const response = await this.request<{
      id: string;
      title: string;
      description: string;
      technologies: string[];
      liveUrl?: string;
      imageUrl?: string;
      highlights: string[];
      order: number;
      createdAt: string;
      updatedAt: string;
    }>(`/api/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...(project.title && { title: project.title }),
        ...(project.description && { description: project.description }),
        ...(project.technologies && { technologies: project.technologies }),
        ...(project.liveUrl && { liveUrl: project.liveUrl }),
        ...(project.imageUrl && { imageUrl: project.imageUrl }),
        ...(project.highlights && { highlights: project.highlights }),
        ...(project.order !== undefined && { order: project.order })
      }),
    });

    return {
      id: response.id,
      title: response.title,
      description: response.description,
      technologies: response.technologies,
      githubUrl: project.githubUrl,
      liveUrl: response.liveUrl,
      imageUrl: response.imageUrl,
      highlights: response.highlights,
      order: response.order,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
      isPublished: true
    };
  }

  async deleteProject(id: string): Promise<void> {
    await this.request(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Other content methods
  async getSkills(): Promise<Skill[]> {
    const skills = await this.request<Array<{
      id: string;
      title: string;
      category: string;
      level: string;
      iconUrl?: string;
      yearsExperience: number;
      proficiency: number;
      isActive: boolean;
      lastUsed?: string;
      order: number;
      createdAt: string;
      updatedAt: string;
    }>>('/api/skills');

    return skills.map(skill => ({
      id: skill.id,
      name: skill.title,
      category: skill.category.toLowerCase(),
      proficiency: skill.proficiency,
      yearsOfExperience: skill.yearsExperience,
      order: skill.order,
      isVisible: skill.isActive
    }));
  }

  async createSkill(skill: Partial<Skill>): Promise<Skill> {
    const response = await this.request<{
      id: string;
      title: string;
      category: string;
      level: string;
      iconUrl?: string;
      yearsExperience: number;
      proficiency: number;
      isActive: boolean;
      order: number;
      createdAt: string;
      updatedAt: string;
    }>('/api/skills', {
      method: 'POST',
      body: JSON.stringify({
        title: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        yearsExperience: skill.yearsOfExperience,
        order: skill.order,
        isActive: skill.isVisible ?? true,
        level: 'intermediate' // Default level
      }),
    });

    return {
      id: response.id,
      name: response.title,
      category: response.category.toLowerCase(),
      proficiency: response.proficiency,
      yearsOfExperience: response.yearsExperience,
      order: response.order,
      isVisible: response.isActive
    };
  }

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
    const response = await this.request<{
      id: string;
      title: string;
      category: string;
      level: string;
      iconUrl?: string;
      yearsExperience: number;
      proficiency: number;
      isActive: boolean;
      order: number;
      createdAt: string;
      updatedAt: string;
    }>(`/api/skills/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...(skill.name && { title: skill.name }),
        ...(skill.category && { category: skill.category }),
        ...(skill.proficiency !== undefined && { proficiency: skill.proficiency }),
        ...(skill.yearsOfExperience !== undefined && { yearsExperience: skill.yearsOfExperience }),
        ...(skill.order !== undefined && { order: skill.order }),
        ...(skill.isVisible !== undefined && { isActive: skill.isVisible })
      }),
    });

    return {
      id: response.id,
      name: response.title,
      category: response.category.toLowerCase(),
      proficiency: response.proficiency,
      yearsOfExperience: response.yearsExperience,
      order: response.order,
      isVisible: response.isActive
    };
  }

  async deleteSkill(id: string): Promise<void> {
    await this.request(`/api/skills/${id}`, {
      method: 'DELETE',
    });
  }

  async getExperience(): Promise<Experience[]> {
    const experiences = await this.request<Array<{
      id: string;
      position: string;
      company: string;
      startDate: string;
      endDate?: string;
      description: string;
      points: string[];
      order: number;
    }>>('/api/experience');

    return experiences.map(exp => ({
      id: exp.id,
      company: exp.company,
      position: exp.position,
      description: exp.description,
      startDate: new Date(exp.startDate),
      endDate: exp.endDate ? new Date(exp.endDate) : undefined,
      technologies: [], // Backend doesn't have technologies field
      achievements: exp.points,
      order: exp.order,
      isVisible: true
    }));
  }

  async createExperience(experience: Partial<Experience>): Promise<Experience> {
    const response = await this.request<{
      id: string;
      position: string;
      company: string;
      startDate: string;
      endDate?: string;
      description: string;
      points: string[];
      order: number;
    }>('/api/experience', {
      method: 'POST',
      body: JSON.stringify({
        company: experience.company,
        position: experience.position,
        description: experience.description,
        startDate: experience.startDate?.toISOString(),
        endDate: experience.endDate?.toISOString(),
        points: experience.achievements || [],
        order: experience.order
      }),
    });

    return {
      id: response.id,
      company: response.company,
      position: response.position,
      description: response.description,
      startDate: new Date(response.startDate),
      endDate: response.endDate ? new Date(response.endDate) : undefined,
      technologies: experience.technologies || [],
      achievements: response.points,
      order: response.order,
      isVisible: true
    };
  }

  async updateExperience(id: string, experience: Partial<Experience>): Promise<Experience> {
    const response = await this.request<{
      id: string;
      position: string;
      company: string;
      startDate: string;
      endDate?: string;
      description: string;
      points: string[];
      order: number;
    }>(`/api/experience/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...(experience.company && { company: experience.company }),
        ...(experience.position && { position: experience.position }),
        ...(experience.description && { description: experience.description }),
        ...(experience.startDate && { startDate: experience.startDate.toISOString() }),
        ...(experience.endDate !== undefined && { endDate: experience.endDate?.toISOString() }),
        ...(experience.achievements && { points: experience.achievements }),
        ...(experience.order !== undefined && { order: experience.order })
      }),
    });

    return {
      id: response.id,
      company: response.company,
      position: response.position,
      description: response.description,
      startDate: new Date(response.startDate),
      endDate: response.endDate ? new Date(response.endDate) : undefined,
      technologies: experience.technologies || [],
      achievements: response.points,
      order: response.order,
      isVisible: true
    };
  }

  async deleteExperience(id: string): Promise<void> {
    await this.request(`/api/experience/${id}`, {
      method: 'DELETE',
    });
  }

  async getCertificates(): Promise<Certificate[]> {
    const certificates = await this.request<Array<{
      id: string;
      title: string;
      issuer: string;
      date: string;
      description?: string;
      url?: string;
      order: number;
    }>>('/api/certificates');

    return certificates.map(cert => ({
      id: cert.id,
      name: cert.title,
      issuer: cert.issuer,
      issueDate: new Date(cert.date),
      expiryDate: undefined, // Backend doesn't have expiry date
      credentialId: undefined,
      credentialUrl: cert.url,
      imageUrl: undefined,
      order: cert.order,
      isVisible: true
    }));
  }

  // File upload method
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('resource', 'portfolio-images');

    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/uploads`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result = await response.json();
    
    // Try to find URL in various possible locations
    const url = result.secure_url || 
                result.url || 
                result.data?.url || 
                result.data?.secure_url ||
                result.fileUrl ||
                result.data?.fileUrl;
    
    if (!url) {
      throw new Error('Upload succeeded but no URL was returned');
    }
    
    const filename = result.original_filename || result.filename || result.data?.filename || file.name;
    const size = result.bytes || result.size || result.data?.size || file.size;
    
    return {
      success: true,
      data: {
        url,
        filename,
        size
      }
    };
  }

  // Profile methods
  async getProfile(): Promise<Profile> {
    const profile = await this.request<{
      id: string;
      name: string;
      title: string;
      bio: string;
      badges: string[];
      location: string;
      locationUrl?: string;
      email: string;
      phone: string;
      cvUrl?: string;
      imageUrl?: string;
      social: {
        twitter?: string;
        linkedin?: string;
        github?: string;
      };
      about: string;
      services: string[];
      createdAt: string;
      updatedAt: string;
    }>('/api/profile');

    return {
      ...profile,
      createdAt: new Date(profile.createdAt),
      updatedAt: new Date(profile.updatedAt)
    };
  }

  async updateProfile(profileData: ProfileInput): Promise<Profile> {
    const profile = await this.request<{
      id: string;
      name: string;
      title: string;
      bio: string;
      badges: string[];
      location: string;
      locationUrl?: string;
      email: string;
      phone: string;
      cvUrl?: string;
      imageUrl?: string;
      social: {
        twitter?: string;
        linkedin?: string;
        github?: string;
      };
      about: string;
      services: string[];
      createdAt: string;
      updatedAt: string;
    }>('/api/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });

    return {
      ...profile,
      createdAt: new Date(profile.createdAt),
      updatedAt: new Date(profile.updatedAt)
    };
  }
}

// Export singleton instance
export const apiClient = new ApiClientImpl();

// Export class for testing
export { ApiClientImpl };