/**
 * Authentication Store using Zustand
 * Manages authentication state and operations with persistent storage
 * Requirements: 1.2, 1.4, 1.6
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthStore, LoginCredentials, AuthenticationError, ValidationError } from '@/types';
import { apiClient } from '@/lib/api-client';

// Session management utilities
const SESSION_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes (before 15min token expiry)
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

interface SessionManager {
  refreshTimer: NodeJS.Timeout | null;
  retryCount: number;
}

const sessionManager: SessionManager = {
  refreshTimer: null,
  retryCount: 0
};

// Utility function for retry logic with exponential backoff
const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxAttempts: number = MAX_RETRY_ATTEMPTS,
  baseDelay: number = RETRY_DELAY
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on authentication/validation errors
      if (error instanceof AuthenticationError || error instanceof ValidationError) {
        throw error;
      }
      
      if (attempt === maxAttempts) {
        break;
      }
      
      // Exponential backoff: 1s, 2s, 4s, etc.
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

// Clear any existing refresh timer
const clearRefreshTimer = () => {
  if (sessionManager.refreshTimer) {
    clearInterval(sessionManager.refreshTimer);
    sessionManager.refreshTimer = null;
  }
};

// Set up automatic token refresh
const setupTokenRefresh = (refreshAuth: () => Promise<void>) => {
  clearRefreshTimer();
  
  sessionManager.refreshTimer = setInterval(async () => {
    try {
      await refreshAuth();
      sessionManager.retryCount = 0; // Reset retry count on success
    } catch (error) {
      console.warn('Automatic token refresh failed:', error);
      sessionManager.retryCount++;
      
      // Stop trying after too many failures
      if (sessionManager.retryCount >= MAX_RETRY_ATTEMPTS) {
        clearRefreshTimer();
      }
    }
  }, SESSION_REFRESH_INTERVAL);
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await retryWithBackoff(async () => {
            return await apiClient.login(credentials);
          });
          
          // Set token in API client for subsequent requests
          if (response.data.token) {
            apiClient.setToken(response.data.token);
          }
          
          set({ 
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true, 
            isLoading: false,
            error: null
          });
          
          // Set up automatic token refresh
          setupTokenRefresh(get().refreshAuth);
          
        } catch (error) {
          let errorMessage = 'Login failed';
          
          if (error instanceof AuthenticationError) {
            errorMessage = 'Invalid email or password';
          } else if (error instanceof ValidationError) {
            errorMessage = 'Please check your input and try again';
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          
          set({ 
            error: errorMessage, 
            isLoading: false,
            user: null,
            token: null,
            isAuthenticated: false
          });
          
          // Clear any existing refresh timer on login failure
          clearRefreshTimer();
          
          throw error;
        }
      },

      signup: async (userData: {
        email: string;
        password: string;
        name: string;
        phoneNumber?: string;
      }) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await retryWithBackoff(async () => {
            return await apiClient.signup(userData);
          });
          
          // Set token in API client for subsequent requests
          if (response.data.token) {
            apiClient.setToken(response.data.token);
          }
          
          set({ 
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true, 
            isLoading: false,
            error: null
          });
          
          // Set up automatic token refresh
          setupTokenRefresh(get().refreshAuth);
          
        } catch (error) {
          let errorMessage = 'Signup failed';
          
          if (error instanceof AuthenticationError) {
            errorMessage = 'Email already exists or invalid credentials';
          } else if (error instanceof ValidationError) {
            errorMessage = 'Please check your input and try again';
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          
          set({ 
            error: errorMessage, 
            isLoading: false,
            user: null,
            token: null,
            isAuthenticated: false
          });
          
          // Clear any existing refresh timer on signup failure
          clearRefreshTimer();
          
          throw error;
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        // Clear refresh timer immediately
        clearRefreshTimer();
        
        try {
          // Attempt to notify backend of logout
          await retryWithBackoff(async () => {
            return await apiClient.logout();
          }, 2); // Fewer retries for logout
        } catch (error) {
          // Don't fail logout if backend call fails
          console.warn('Backend logout notification failed:', error);
        } finally {
          // Always clear local state regardless of backend response
          apiClient.setToken(null);
          set({ 
            user: null,
            token: null,
            isAuthenticated: false, 
            error: null,
            isLoading: false
          });
        }
      },
      
      refreshAuth: async () => {
        const { isAuthenticated, user } = get();
        
        // Only try to refresh if we think we're authenticated
        if (!isAuthenticated || !user) {
          return;
        }
        
        // Don't show loading for automatic refreshes
        const isManualRefresh = !sessionManager.refreshTimer;
        if (isManualRefresh) {
          set({ isLoading: true });
        }
        
        try {
          const response = await retryWithBackoff(async () => {
            return await apiClient.refreshToken();
          });
          
          if (response?.data?.user && response?.data?.token) {
            // Update token in API client
            apiClient.setToken(response.data.token);
            
            set({ 
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true, 
              isLoading: false,
              error: null
            });
            
            // Ensure refresh timer is running
            if (!sessionManager.refreshTimer) {
              setupTokenRefresh(get().refreshAuth);
            }
          } else {
            throw new AuthenticationError('Invalid refresh response');
          }
        } catch (error) {
          console.error('Auth refresh failed:', error);
          
          // Clear everything on refresh failure
          clearRefreshTimer();
          apiClient.setToken(null);
          
          set({ 
            user: null,
            token: null,
            isAuthenticated: false, 
            isLoading: false,
            error: isManualRefresh ? 'Session expired. Please log in again.' : null
          });
          
          // Only throw error for manual refreshes
          if (isManualRefresh) {
            throw error;
          }
        }
      },
      
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
      onRehydrateStorage: () => (state) => {
        // Set token in apiClient if user is authenticated
        if (state?.isAuthenticated && state?.user && state?.token) {
          apiClient.setToken(state.token);
        }
      }
    }
  )
);

// Cleanup function for when the store is no longer needed
export const cleanupAuthStore = () => {
  clearRefreshTimer();
  sessionManager.retryCount = 0;
};
