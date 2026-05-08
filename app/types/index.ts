/**
 * Main types export file
 * Centralizes all type definitions for the authentication system
 */

// Authentication types
export type {
  User,
  LoginCredentials,
  AuthContextType,
  AuthResponse,
  SessionData,
  AuthState,
  AuthStore
} from './auth';

// Content management types
export type {
  Project,
  ProjectInput,
  Skill,
  Experience,
  Certificate,
  ContentState,
  UploadResponse
} from './content';

// API types
export type {
  ApiError,
  ErrorResponse,
  ApiClient,
  ApiRequest,
  ApiResponse
} from './api';

// API error classes
export {
  ValidationError,
  AuthenticationError,
  AuthorizationError
} from './api';