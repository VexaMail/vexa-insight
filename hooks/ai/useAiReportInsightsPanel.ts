'use client'

import type { AiInsightsState } from '@/types/ai'
import { useCallback } from 'react'
import { useAiAutoTrigger } from './useAiAutoTrigger'
import { useReportInsights } from './useReportInsights'

/**
 * Presentation hook for the AI report insights panel.
 * Auto-triggers fetch on mount when hasEvents is true.
 */
export function useAiReportInsightsPanel(
  reportId: number,
  hasEvents: boolean,
): {
  state: AiInsightsState
  handleAnalyze: () => void
} {
  const { state, fetchInsights } = useReportInsights(reportId)

  useAiAutoTrigger(reportId, hasEvents, fetchInsights)

  const handleAnalyze = useCallback(() => {
    void fetchInsights()
  }, [fetchInsights])

  return { state, handleAnalyze }
}
