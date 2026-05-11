/**
 * Validation Schemas using Zod
 * Defines validation rules for all content types
 * Requirements: 5.1-5.7, 11.1-11.6, 12.1-12.6, 13.1-13.8, 14.1-14.7
 */

import { z } from 'zod';

// Project Form Schema
export const ProjectFormSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters'),
  
  technologies: z.array(z.string())
    .min(1, 'At least 1 technology is required')
    .max(20, 'Maximum 20 technologies allowed'),
  
  githubUrl: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  
  liveUrl: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  
  imageUrl: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  
  highlights: z.array(z.string())
    .max(10, 'Maximum 10 highlights allowed')
    .default([]),
  
  order: z.number()
    .int('Order must be an integer')
    .positive('Order must be a positive integer'),
});

export type ProjectFormData = z.infer<typeof ProjectFormSchema>;

// Skill Form Schema
export const SkillFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  
  category: z.enum(['frontend', 'backend', 'database', 'tools', 'other'], {
    errorMap: () => ({ message: 'Category must be one of: frontend, backend, database, tools, or other' }),
  }),
  
  proficiency: z.number()
    .min(1, 'Proficiency must be at least 1')
    .max(100, 'Proficiency must be at most 100'),
  
  yearsOfExperience: z.number()
    .min(0, 'Years of experience must be at least 0')
    .max(50, 'Years of experience must be at most 50'),
  
  order: z.number()
    .int('Order must be an integer')
    .positive('Order must be a positive integer'),
  
  isVisible: z.boolean(),
});

export type SkillFormData = z.infer<typeof SkillFormSchema>;

// Experience Form Schema
export const ExperienceFormSchema = z.object({
  company: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be at most 100 characters'),
  
  position: z.string()
    .min(2, 'Position must be at least 2 characters')
    .max(100, 'Position must be at most 100 characters'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be at most 1000 characters'),
  
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Invalid date',
  }).refine((date) => date <= new Date(), {
    message: 'Start date cannot be in the future',
  }),
  
  endDate: z.date({
    invalid_type_error: 'Invalid date',
  }).optional(),
  
  technologies: z.array(z.string())
    .max(20, 'Maximum 20 technologies allowed')
    .default([]),
  
  achievements: z.array(z.string())
    .max(15, 'Maximum 15 achievements allowed')
    .default([]),
  
  order: z.number()
    .int('Order must be an integer')
    .positive('Order must be a positive integer'),
  
  isVisible: z.boolean().default(true),
}).refine((data) => {
  if (data.endDate && data.startDate) {
    return data.endDate > data.startDate;
  }
  return true;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

export type ExperienceFormData = z.infer<typeof ExperienceFormSchema>;

// Certificate Form Schema
export const CertificateFormSchema = z.object({
  name: z.string()
    .min(3, 'Certificate name must be at least 3 characters')
    .max(150, 'Certificate name must be at most 150 characters'),
  
  issuer: z.string()
    .min(2, 'Issuer must be at least 2 characters')
    .max(100, 'Issuer must be at most 100 characters'),
  
  issueDate: z.date({
    required_error: 'Issue date is required',
    invalid_type_error: 'Invalid date',
  }),
  
  expiryDate: z.date({
    invalid_type_error: 'Invalid date',
  }).optional(),
  
  credentialId: z.string()
    .min(5, 'Credential ID must be at least 5 characters')
    .max(100, 'Credential ID must be at most 100 characters')
    .optional()
    .or(z.literal('')),
  
  credentialUrl: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  
  imageUrl: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  
  order: z.number()
    .int('Order must be an integer')
    .positive('Order must be a positive integer'),
  
  isVisible: z.boolean().default(true),
}).refine((data) => {
  if (data.expiryDate && data.issueDate) {
    return data.expiryDate > data.issueDate;
  }
  return true;
}, {
  message: 'Expiry date must be after issue date',
  path: ['expiryDate'],
});

export type CertificateFormData = z.infer<typeof CertificateFormSchema>;
