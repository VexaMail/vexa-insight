'use client'

import type { UseSourceReviewReturn } from '@/types/ips'
import type { SourceVerdict } from '@/types/source-reviews'
import { useCallback, useState } from 'react'

/** Saves or clears the operator's verdict on a source for one domain. */
export function useSourceReview(
  ip: string,
  domain: string,
  initialVerdict: SourceVerdict | null,
  onSaved?: () => void,
): UseSourceReviewReturn {
  const [verdict, setCurrent] = useState(initialVerdict)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setVerdict = useCallback(
    (next: SourceVerdict | null) => {
      setSaving(true)
      setError(null)
      void (async () => {
        try {
          const response =
            next === null
              ? await fetch(
                  `/api/v1/sources/reviews?${new URLSearchParams({ ip, domain }).toString()}`,
                  { method: 'DELETE' },
                )
              : await fetch('/api/v1/sources/reviews', {
                  method: 'PUT',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({ ip, domain, verdict: next }),
                })
          if (response.ok) {
            setCurrent(next)
            onSaved?.()
          } else setError('Not saved')
        } catch {
          setError('Not saved')
        } finally {
          setSaving(false)
        }
      })()
    },
    [ip, domain, onSaved],
  )
  return { verdict, saving, error, setVerdict }
}
