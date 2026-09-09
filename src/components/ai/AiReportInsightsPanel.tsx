'use client'

import { useAiReportInsightsPanel } from '../../hooks/ai/useAiReportInsightsPanel'
import { useAiTimeout } from '../../hooks/ai/useAiTimeout'
import AiEmptyState from './AiEmptyState'
import AiErrorState from './AiErrorState'
import AiNotConfiguredCta from './AiNotConfiguredCta'
import { AiReportInsightsHeading } from './AiReportInsightsHeading'
import type { AiReportInsightsPanelProps } from './AiReportInsightsPanelProps'
import { AiReportInsightsPendingCard } from './AiReportInsightsPendingCard'
import { AiReportInsightsResults } from './AiReportInsightsResults'

export default function AiReportInsightsPanel({
  reportId,
  isAiConfigured,
  hasEvents,
}: Readonly<AiReportInsightsPanelProps>) {
  const { state, handleAnalyze } = useAiReportInsightsPanel(reportId, hasEvents)
  const isTimedOut = useAiTimeout(state.status)

  if (!isAiConfigured) {
    return <AiNotConfiguredCta />
  }

  if (!hasEvents) {
    return null
  }

  if (state.status === 'idle' || state.status === 'loading') {
    return <AiReportInsightsPendingCard isTimedOut={isTimedOut} />
  }

  if (state.status === 'error') {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AiReportInsightsHeading />
        </div>
        <AiErrorState message={state.error.message} onRetry={handleAnalyze} />
      </div>
    )
  }

  if (state.data.insights.length === 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <AiReportInsightsHeading />
        </div>
        <AiEmptyState />
      </div>
    )
  }

  return (
    <AiReportInsightsResults result={state.data} onReanalyze={handleAnalyze} />
  )
}
