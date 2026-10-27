export function isPlaceholderProjectUrl(value?: string) {
  if (!value) return false;

  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname.startsWith('demo.') || /(^|\.)example\.(com|org|net)$/.test(hostname);
  } catch {
    return false;
  }
}
