import { useCallback, useEffect, useRef, useState } from 'react'
import type { PublicDomainReport } from '../../../types/public-check/PublicDomainReport'
import { fetchPublicReport } from '../fetchPublicReport'
import { trackPublicEvent } from '../trackPublicEvent'

export function usePublicReportRequest() {
  const [report, setReport] = useState<PublicDomainReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const controller = useRef<AbortController | null>(null)
  useEffect(() => () => controller.current?.abort(), [])
  const reset = useCallback(() => {
    controller.current?.abort()
    setReport(null)
    setError(null)
    setPending(false)
  }, [])
  const load = useCallback(
    async (
      domain: string,
      selector?: string,
    ): Promise<PublicDomainReport | null> => {
      controller.current?.abort()
      const active = new AbortController()
      controller.current = active
      trackPublicEvent('checker_started')
      setPending(true)
      setError(null)
      try {
        const result = await fetchPublicReport(domain, active.signal, selector)
        if (active.signal.aborted) return null
        trackPublicEvent('checker_completed')
        setReport(result)
        return result
      } catch (failure) {
        if (!active.signal.aborted) trackPublicEvent('checker_failed')
        if (!active.signal.aborted)
          setError(
            failure instanceof Error
              ? failure.message
              : 'The check could not finish. Please try again.',
          )
        return null
      } finally {
        if (controller.current === active) setPending(false)
      }
    },
    [],
  )
  return { report, error, pending, load, reset }
}
