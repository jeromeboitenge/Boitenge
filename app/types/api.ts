/**
 * API-related TypeScript interfaces and types
 * Requirements: 5.1, 5.2
 */

import { User, LoginCredentials, AuthResponse } from './auth';
import { Project, ProjectInput, Skill, Experience, Certificate, UploadResponse, Profile, ProfileInput } from './content';

export interface ApiError extends Error {
  status: number;
  code: string;
  details?: any;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface ApiClient {
  // Authentication
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshToken(): Promise<AuthResponse>;
  
  // Profile
  getProfile(): Promise<Profile>;
  updateProfile(profile: ProfileInput): Promise<Profile>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project>;
  createProject(project: ProjectInput): Promise<Project>;
  updateProject(id: string, project: Partial<ProjectInput>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Other content types
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getCertificates(): Promise<Certificate[]>;
  
  // File operations
  uploadImage(file: File): Promise<UploadResponse>;
}

export interface ApiRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export class ValidationError extends Error implements ApiError {
  status = 400;
  code = 'VALIDATION_ERROR';
  details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.details = details;
  }
}

export class AuthenticationError extends Error implements ApiError {
  status = 401;
  code = 'AUTHENTICATION_ERROR';
  details?: any;

  constructor(message: string = 'Authentication required') {
    super(message);
  }
}

export class AuthorizationError extends Error implements ApiError {
  status = 403;
  code = 'AUTHORIZATION_ERROR';
  details?: any;

  constructor(message: string = 'Insufficient permissions') {
    super(message);
  }
}