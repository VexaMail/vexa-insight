'use client'

import type { ReportInsight } from '@/types/ai'
import { useAiReportInsightsPanel } from '../../hooks/ai/useAiReportInsightsPanel'
import { useAiTimeout } from '../../hooks/ai/useAiTimeout'
import AiEmptyState from './AiEmptyState'
import AiErrorState from './AiErrorState'
import AiInsightCard from './AiInsightCard'
import AiLoadingSkeleton from './AiLoadingSkeleton'
import AiNotConfiguredCta from './AiNotConfiguredCta'
import type { AiReportInsightsPanelProps } from './AiReportInsightsPanelProps'

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
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            ✨
          </span>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            AI Insights
          </h3>
        </div>
        {isTimedOut ? (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            Analysis is taking longer than expected. You can continue reviewing
            sources below.
          </p>
        ) : (
          <AiLoadingSkeleton />
        )}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            ✨
          </span>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            AI Insights
          </h3>
        </div>
        <AiErrorState message={state.error.message} onRetry={handleAnalyze} />
      </div>
    )
  }

  if (state.data.insights.length === 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            ✨
          </span>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            AI Insights
          </h3>
        </div>
        <AiEmptyState />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            ✨
          </span>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            AI Insights
          </h3>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {state.data.insights.length} findings · {state.data.metadata.model}{' '}
            · {state.data.metadata.durationMs}ms
          </span>
        </div>
        <button
          type="button"
          onClick={handleAnalyze}
          className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
        >
          Re-analyze
        </button>
      </div>
      {state.data.insights.map((insight: ReportInsight, i: number) => (
        <AiInsightCard
          key={`${insight.category}-${String(i)}`}
          insight={insight}
        />
      ))}
    </div>
  )
}
