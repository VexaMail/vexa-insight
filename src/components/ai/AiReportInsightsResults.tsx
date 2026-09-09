'use client'

import type { ReportInsight } from '@/types/ai'
import AiInsightCard from './AiInsightCard'
import { AiReportInsightsHeading } from './AiReportInsightsHeading'
import type { AiReportInsightsResultsProps } from './AiReportInsightsResultsProps'

export function AiReportInsightsResults({
  result,
  onReanalyze,
}: Readonly<AiReportInsightsResultsProps>) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AiReportInsightsHeading />
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {result.insights.length} findings · {result.metadata.model} ·{' '}
            {result.metadata.durationMs}ms
          </span>
        </div>
        <button
          type="button"
          onClick={onReanalyze}
          className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
        >
          Re-analyze
        </button>
      </div>
      {result.insights.map((insight: ReportInsight, i: number) => (
        <AiInsightCard
          key={`${insight.category}-${String(i)}`}
          insight={insight}
        />
      ))}
    </div>
  )
}
