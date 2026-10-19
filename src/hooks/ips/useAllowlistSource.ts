'use client'

import type { UseAllowlistSourceReturn } from '@/types/ips'
import type { SourceVerdict } from '@/types/source-reviews'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useSourceReview } from './useSourceReview'

/**
 * Records the operator verdict `legitimate` for the one domain a source sends
 * for, then refreshes the page so the operator review panel shows it.
 */
export function useAllowlistSource(
  ip: string,
  domain: string,
  initialVerdict: SourceVerdict | null,
): UseAllowlistSourceReturn {
  const router = useRouter()
  const refresh = useCallback(() => {
    router.refresh()
  }, [router])
  const { verdict, saving, error, setVerdict } = useSourceReview(
    ip,
    domain,
    initialVerdict,
    refresh,
  )
  const add = useCallback(() => {
    setVerdict('legitimate')
  }, [setVerdict])
  return { listed: verdict === 'legitimate', saving, error, add }
}
