import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://example.com'

  return [
    {
      url: `${baseUrl}/login`,
      changeFrequency: 'monthly',
      priority: 0.7,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/install`,
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date(),
    },
  ]
}
