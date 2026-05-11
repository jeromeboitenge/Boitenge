/**
 * Backend health check utility
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portifolio-backend-ptck.onrender.com';
const HEALTH_CHECK_TIMEOUT = 5000; // 5 seconds

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT);

    const response = await fetch(`${BACKEND_URL}/health`, {
      signal: controller.signal,
      method: 'GET',
    });

    clearTimeout(timeoutId);
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
