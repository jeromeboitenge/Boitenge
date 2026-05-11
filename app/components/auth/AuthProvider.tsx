/**
 * Authentication Provider Component
 * Provides authentication context to the entire application
 * Requirements: 1.2, 1.3, 1.5
 */

'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { AuthContextType } from '@/types';
import { useAuthStore } from '@/stores/authStore';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    refreshAuth,
    clearError
  } = useAuthStore();

  // Initialize authentication on mount
  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      if (mounted && isAuthenticated) {
        try {
          await refreshAuth();
        } catch (error) {
          console.error('Auth initialization failed:', error);
        }
      }
    };
    
    initAuth();
    
    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
    error
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}