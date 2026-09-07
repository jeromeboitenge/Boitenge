export const DEFAULT_BACKEND_BASE_URL = 'https://portifolio-backend-ptck.onrender.com';

export function getBackendBaseUrl(): string {
  const configured = (process.env.NEXT_PUBLIC_BACKEND_API_URL || '').trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }

  return DEFAULT_BACKEND_BASE_URL;
}

export function buildBackendUrl(path = '/'): string {
  const baseUrl = getBackendBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function getBackendHealthUrl(): string {
  return buildBackendUrl('/health');
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 20000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 2,
  timeoutMs = 20000
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fetchWithTimeout(url, options, timeoutMs);
    } catch (error) {
      lastError = error;
      if (attempt === retries) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Request failed');
}
