'use client'

import { UPDATE_CHECK_ENDPOINT_PATH } from '@/constants/updates'
import type { UseSidebarVersionStatusReturn } from '@/types/shell'
import type { UpdateStatusPublic } from '@/types/updates'
import { useEffect, useState } from 'react'

/**
 * Lightweight read-only hook used by the sidebar footer.
 * Silently ignores fetch failures so a network blip never breaks the shell.
 */
export function useSidebarVersionStatus(): UseSidebarVersionStatusReturn {
  const [status, setStatus] = useState<UpdateStatusPublic | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const response = await fetch(UPDATE_CHECK_ENDPOINT_PATH, {
          cache: 'no-store',
        })
        if (!response.ok) return
        const json = (await response.json()) as { data?: UpdateStatusPublic }
        if (!cancelled && json.data) setStatus(json.data)
      } catch {
        // intentionally silent
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return { status }
}
