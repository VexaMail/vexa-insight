'use client'

import dynamic from 'next/dynamic'

export const LazyXmlViewer = dynamic(() => import('./XmlViewer'), {
  ssr: false,
})
