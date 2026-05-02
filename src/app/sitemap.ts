import type { MetadataRoute } from 'next';

const BASE_URL = 'https://simplite.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ko', 'en'] as const;
  const pages: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/tika', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/markflow', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  ];

  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          ko: `${BASE_URL}/ko`,
          en: `${BASE_URL}/en`,
          'x-default': `${BASE_URL}/ko`,
        },
      },
    },
  ];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            ko: `${BASE_URL}/ko${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
            'x-default': `${BASE_URL}/ko${page.path}`,
          },
        },
      });
    }
  }

  return entries;
}
