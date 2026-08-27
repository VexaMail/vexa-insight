'use client'

import type {
  AiInsightsState,
  AIServiceError,
  ReportAnalysisResult,
} from '@/types/ai'
import { useCallback, useState } from 'react'

/**
 * Hook managing the lifecycle of an AI report insights request.
 */
export function useReportInsights(reportId: number) {
  const [state, setState] = useState<AiInsightsState>({ status: 'idle' })

  const fetchInsights = useCallback(async () => {
    setState({ status: 'loading' })
    try {
      const response = await fetch('/api/v1/ai/report-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId }),
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

      const body = (await response.json()) as { data: ReportAnalysisResult }
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
  }, [reportId])

  return { state, fetchInsights }
}
