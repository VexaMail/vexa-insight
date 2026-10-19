'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import type { UseDiagnosticsRerunReturn } from '@/types/diagnostics'

/**
 * Re-runs the checks: the page does its DNS lookups per request, so a router
 * refresh is a new run. `isPending` stays true until the new result renders.
 */
export function useDiagnosticsRerun(): UseDiagnosticsRerunReturn {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function rerun() {
    startTransition(() => {
      router.refresh()
    })
  }

  return { isPending, rerun }
}
