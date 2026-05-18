import type { MetadataRoute } from 'next';

/**
 * Sitemap — spavibe.in
 * 
 * Only canonical page URLs are included. Hash fragments
 * (e.g. /#gallery) are not valid sitemap entries — search
 * engines strip fragments before processing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://spavibe.in';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
