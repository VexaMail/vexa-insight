'use client'

import dynamic from 'next/dynamic'

export const LazyXmlViewer = dynamic(async () => import('./XmlViewer'), {
  ssr: false,
})
