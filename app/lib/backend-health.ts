/**
 * Backend health check utility
 */

import { fetchWithRetry, getBackendHealthUrl } from './backend-config';

const HEALTH_CHECK_TIMEOUT = 20000;

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetchWithRetry(
      getBackendHealthUrl(),
      { method: 'GET', headers: { 'Content-Type': 'application/json' } },
      2,
      HEALTH_CHECK_TIMEOUT,
    );

    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error);
    return false;
  }
}

export async function initializeApiClient(apiClient: any): Promise<void> {
  const isBackendHealthy = await checkBackendHealth();

  if (!isBackendHealthy) {
    console.warn('Backend is unavailable, using local API');
    apiClient.useLocalApi();
  } else {
    console.log('Backend is healthy, using remote API');
  }
}
