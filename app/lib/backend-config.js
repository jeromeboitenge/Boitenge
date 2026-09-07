const DEFAULT_BACKEND_BASE_URL = 'https://portifolio-backend-ptck.onrender.com';

export function getBackendBaseUrl() {
  const configured = (process.env.NEXT_PUBLIC_BACKEND_API_URL || '').trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }

  return DEFAULT_BACKEND_BASE_URL;
}

export function buildBackendUrl(path = '/') {
  const baseUrl = getBackendBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function getBackendHealthUrl() {
  return buildBackendUrl('/health');
}

export async function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchWithRetry(url, options = {}, retries = 2, timeoutMs = 20000) {
  let lastError;

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

  throw lastError;
}
