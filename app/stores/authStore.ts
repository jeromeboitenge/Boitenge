/**
 * Authentication Store using Zustand
 * Manages authentication state and operations
 * Requirements: 1.2, 1.4, 1.6
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, LoginCredentials } from '@/types';
import { apiClient } from '@/lib/api-client';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.login(credentials);
          
          set({ 
            user: response.data.user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ 
            error: errorMessage, 
            isLoading: false,
            user: null,
            isAuthenticated: false
          });
          throw error;
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await apiClient.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null,
            isLoading: false
          });
        }
      },
      
      refreshAuth: async () => {
        const { isAuthenticated } = get();
        
        // Only try to refresh if we think we're authenticated
        if (!isAuthenticated) {
          return;
        }
        
        set({ isLoading: true });
        
        try {
          const response = await apiClient.refreshToken();
          
          if (response?.data?.user) {
            set({ 
              user: response.data.user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            });
          } else {
            // No valid session found
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false,
              error: null
            });
          }
        } catch (error) {
          console.error('Auth refresh failed:', error);
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null
          });
        }
      },
      
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);