/**
 * Authentication Guard Component
 * Protects routes and components that require authentication
 * Requirements: 1.5, 4.7
 */

'use client';

import React from 'react';
import { useAuth } from './AuthProvider';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ 
  children, 
  fallback = <div>Please log in to access this content.</div>,
  requireAuth = true 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}