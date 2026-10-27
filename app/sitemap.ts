import type { MetadataRoute } from 'next';

const siteUrl = 'https://boitenge.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/about', '/skills', '/projects', '/experience', '/contact'].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority: path ? 0.7 : 1,
  }));
}
