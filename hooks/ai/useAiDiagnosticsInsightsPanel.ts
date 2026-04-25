'use client'

import type { DiagnosticsInsightsState } from '@/types/ai'
import { useCallback } from 'react'
import { useDiagnosticsInsights } from '../../hooks/ai/useDiagnosticsInsights'

/**
 * Presentation hook for the AI diagnostics insights panel.
 * Wraps useDiagnosticsInsights and provides a void-returning handler for onClick.
 */
export function useAiDiagnosticsInsightsPanel(
  domainName: string,
  domainId: number,
  startDate?: string,
  endDate?: string,
): {
  state: DiagnosticsInsightsState
  handleAnalyze: () => void
} {
  const { state, fetchInsights } = useDiagnosticsInsights(
    domainName,
    domainId,
    startDate,
    endDate,
  )

  const handleAnalyze = useCallback(() => {
    void fetchInsights()
  }, [fetchInsights])

  return { state, handleAnalyze }
}
