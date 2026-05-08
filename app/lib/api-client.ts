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
  AuthorizationError
} from '@/types';

class ApiClientImpl implements ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portifolio-backend-ptck.onrender.com') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      return await response.json();
    } catch (error) {
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

  // Authentication methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout(): Promise<void> {
    await this.request('/api/auth/logout', {
      method: 'POST',
    });
    this.setToken(null);
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/refresh', {
      method: 'POST',
    });

    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    const response = await this.request<{ success: boolean; data: Project[] }>('/api/projects');
    return response.data;
  }

  async getProject(id: string): Promise<Project> {
    const response = await this.request<{ success: boolean; data: Project }>(`/api/projects/${id}`);
    return response.data;
  }

  async createProject(project: ProjectInput): Promise<Project> {
    const response = await this.request<{ success: boolean; data: Project }>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
    return response.data;
  }

  async updateProject(id: string, project: Partial<ProjectInput>): Promise<Project> {
    const response = await this.request<{ success: boolean; data: Project }>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
    return response.data;
  }

  async deleteProject(id: string): Promise<void> {
    await this.request(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Other content methods
  async getSkills(): Promise<Skill[]> {
    const response = await this.request<{ success: boolean; data: Skill[] }>('/api/skills');
    return response.data;
  }

  async getExperience(): Promise<Experience[]> {
    const response = await this.request<{ success: boolean; data: Experience[] }>('/api/experience');
    return response.data;
  }

  async getCertificates(): Promise<Certificate[]> {
    const response = await this.request<{ success: boolean; data: Certificate[] }>('/api/certificates');
    return response.data;
  }

  // File upload method
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/api/upload/image`, {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      await this.handleErrorResponse(response);
    }

    return await response.json();
  }
}

// Export singleton instance
export const apiClient = new ApiClientImpl();

// Export class for testing
export { ApiClientImpl };