'use client'

import { useEffect, useState } from 'react'

import type { FetchState } from './FetchState'
import { fetchDnsData } from './fetchDnsData'

export function useDnsDiagnostics(domainId: number) {
  const [state, setState] = useState<FetchState>({
    fetchedForDomainId: null,
    data: null,
    error: null,
  })

  // loading is derived: true while no settled result exists for this domainId
  const loading = state.fetchedForDomainId !== domainId

  useEffect(() => {
    const controller = new AbortController()

    const loadData = async () => {
      try {
        const data = await fetchDnsData(domainId, controller.signal)
        if (!controller.signal.aborted) {
          setState({ fetchedForDomainId: domainId, data, error: null })
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setState({
            fetchedForDomainId: domainId,
            data: null,
            error: err instanceof Error ? err.message : 'Network error',
          })
        }
      }
    }
    void loadData()

    return () => {
      controller.abort()
    }
  }, [domainId])

  return { data: state.data, loading, error: state.error }
}
