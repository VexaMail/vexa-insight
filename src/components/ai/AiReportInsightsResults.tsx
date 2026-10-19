'use client'

import { Button } from '@/components/ui'
import type { ReportInsight } from '@/types/ai'
import { RotateCw } from 'lucide-react'
import AiInsightCard from './AiInsightCard'
import { AiReportInsightsHeading } from './AiReportInsightsHeading'
import type { AiReportInsightsResultsProps } from './AiReportInsightsResultsProps'

export function AiReportInsightsResults({
  result,
  onReanalyze,
}: Readonly<AiReportInsightsResultsProps>) {
  return (
    <div className="glass-card space-y-3 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <AiReportInsightsHeading />
          <span className="text-muted-foreground text-xs">
            {result.insights.length} findings · {result.metadata.model} ·{' '}
            {result.metadata.durationMs}ms
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReanalyze}
          className="print:hidden"
        >
          <RotateCw aria-hidden="true" />
          Re-analyze
        </Button>
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
