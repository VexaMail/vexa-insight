'use client'

import { useState } from 'react'

import type {
  SpfPlan,
  SpfPlanResponse,
  UseSpfPlanReturn,
} from '@/types/diagnostics'

/** Asks the server to count a candidate SPF record's lookups; stores nothing. */
export function useSpfPlan(domainId: number): UseSpfPlanReturn {
  const [plan, setPlan] = useState<SpfPlan | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  function run(record: string) {
    setPending(true)
    setError(null)
    void (async () => {
      try {
        const response = await fetch(
          `/api/v1/domains/${String(domainId)}/dns/spf-plan`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ record }),
          },
        )
        const body = (await response.json()) as SpfPlanResponse
        setPlan(body.data ?? null)
        if (!response.ok || !body.data) {
          setError(body.error?.message ?? 'The lookup count failed')
        }
      } catch {
        setPlan(null)
        setError('The lookup count failed')
      } finally {
        setPending(false)
      }
    })()
  }

  return { plan, error, pending, run }
}
