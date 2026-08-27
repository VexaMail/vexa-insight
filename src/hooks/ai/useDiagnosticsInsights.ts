'use client'

import type {
  AIServiceError,
  DiagnosticsAnalysisResult,
  DiagnosticsInsightsState,
} from '@/types/ai'
import { useCallback, useState } from 'react'

/**
 * Hook managing the lifecycle of a diagnostics AI insights request.
 */
export function useDiagnosticsInsights(
  domainName: string,
  domainId: number,
  startDate?: string,
  endDate?: string,
) {
  const [state, setState] = useState<DiagnosticsInsightsState>({
    status: 'idle',
  })

  const fetchInsights = useCallback(async () => {
    setState({ status: 'loading' })
    try {
      const response = await fetch('/api/v1/ai/diagnostics-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainName, domainId, startDate, endDate }),
      })

      if (!response.ok) {
        const body = (await response.json()) as { error?: AIServiceError }
        setState({
          status: 'error',
          error: body.error ?? {
            code: 'UNKNOWN',
            message: 'An unexpected error occurred.',
          },
        })
        return
      }

      const body = (await response.json()) as {
        data: DiagnosticsAnalysisResult
      }
      setState({ status: 'success', data: body.data })
    } catch {
      setState({
        status: 'error',
        error: {
          code: 'PROVIDER_UNAVAILABLE',
          message: 'Unable to reach the server. Check your connection.',
        },
      })
    }
  }, [domainName, domainId, startDate, endDate])

  return { state, fetchInsights }
}
