'use client'

import { API_REFERENCE_SCRIPT } from '@/constants/docs'
import { mountApiReference } from '@/utils/docs'
import Script from 'next/script'

/** Loads the pinned viewer and mounts it on the reference placeholder. */
export function ApiReferenceScript() {
  return (
    <Script
      src={API_REFERENCE_SCRIPT.src}
      integrity={API_REFERENCE_SCRIPT.integrity}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onReady={mountApiReference}
    />
  )
}
