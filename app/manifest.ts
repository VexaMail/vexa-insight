import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vexa Mail Insight',
    short_name: 'Vexa Insight',
    description:
      'DMARC analytics dashboard with policy visibility, diagnostics, and ingestion monitoring.',
    start_url: '/login',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}
