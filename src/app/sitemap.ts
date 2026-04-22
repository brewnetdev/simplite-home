import type { MetadataRoute } from 'next';

const BASE_URL = 'https://simplite.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ko', 'en'];
  const pages = ['', '/tika', '/markflow', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      const path = `/${locale}${page}`;
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/contact' ? 0.6 : 0.8,
      });
    }
  }

  return entries;
}
