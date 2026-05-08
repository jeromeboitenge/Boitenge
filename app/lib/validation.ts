/**
 * Validation schemas using Zod
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */

import { z } from 'zod';

// Authentication validation schemas
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128, 'Password too long')
});

// Project validation schemas
export const ProjectInputSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required').max(20, 'Too many technologies'),
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Invalid live URL').optional().or(z.literal('')),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  highlights: z.array(z.string()).max(10, 'Too many highlights'),
  order: z.number().int().min(0, 'Order must be non-negative')
});

// Skill validation schemas
export const SkillInputSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(255, 'Name too long'),
  category: z.enum(['frontend', 'backend', 'database', 'tools', 'other']),
  proficiency: z.number().int().min(1, 'Proficiency must be at least 1').max(100, 'Proficiency cannot exceed 100'),
  yearsOfExperience: z.number().int().min(0, 'Years of experience cannot be negative'),
  order: z.number().int().min(0, 'Order must be non-negative')
});

// Experience validation schemas
export const ExperienceInputSchema = z.object({
  company: z.string().min(1, 'Company name is required').max(255, 'Company name too long'),
  position: z.string().min(1, 'Position is required').max(255, 'Position too long'),
  description: z.string().max(2000, 'Description too long').optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  technologies: z.array(z.string()).max(20, 'Too many technologies'),
  achievements: z.array(z.string()).max(10, 'Too many achievements'),
  order: z.number().int().min(0, 'Order must be non-negative')
}).refine(data => {
  if (data.endDate && data.startDate) {
    return data.endDate >= data.startDate;
  }
  return true;
}, {
  message: 'End date must be after start date',
  path: ['endDate']
});

// Certificate validation schemas
export const CertificateInputSchema = z.object({
  name: z.string().min(1, 'Certificate name is required').max(255, 'Name too long'),
  issuer: z.string().min(1, 'Issuer is required').max(255, 'Issuer name too long'),
  issueDate: z.date(),
  expiryDate: z.date().optional(),
  credentialId: z.string().max(255, 'Credential ID too long').optional(),
  credentialUrl: z.string().url('Invalid credential URL').optional().or(z.literal('')),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  order: z.number().int().min(0, 'Order must be non-negative')
}).refine(data => {
  if (data.expiryDate && data.issueDate) {
    return data.expiryDate >= data.issueDate;
  }
  return true;
}, {
  message: 'Expiry date must be after issue date',
  path: ['expiryDate']
});

// Utility function for validation
export function validateAndSanitize<T>(input: unknown, schema: z.ZodSchema<T>): T {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      throw new Error(`Validation failed: ${errorMessage}`);
    }
    throw error;
  }
}

// Type exports for convenience
export type LoginInput = z.infer<typeof LoginSchema>;
export type ProjectInputValidated = z.infer<typeof ProjectInputSchema>;
export type SkillInputValidated = z.infer<typeof SkillInputSchema>;
export type ExperienceInputValidated = z.infer<typeof ExperienceInputSchema>;
export type CertificateInputValidated = z.infer<typeof CertificateInputSchema>;