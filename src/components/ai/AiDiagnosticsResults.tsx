'use client'

import { Button } from '@/components/ui'
import { mapDiagnosticsInsightToRenderable } from '@/mappers/ai'
import { RotateCw } from 'lucide-react'
import type { AiDiagnosticsResultsProps } from './AiDiagnosticsResultsProps'
import { AiInsightsHeading } from './AiInsightsHeading'
import { DiagnosticsRolloutPlanCard } from './DiagnosticsRolloutPlanCard'
import { groupInsightsByTone } from './groupInsightsByTone'
import { InsightSection } from './InsightSection'

/** Render order: improvements, anomalies, informational, then the rollout plan. */
export function AiDiagnosticsResults({
  data,
  onAnalyze,
}: AiDiagnosticsResultsProps) {
  const groups = groupInsightsByTone(
    data.insights.map(mapDiagnosticsInsightToRenderable),
  )

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <AiInsightsHeading />
          <span className="text-muted-foreground text-xs">
            {data.insights.length} findings · {data.metadata.model} ·{' '}
            {data.metadata.durationMs}ms
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAnalyze}
          className="shrink-0 print:hidden"
        >
          <RotateCw aria-hidden="true" />
          Re-analyze
        </Button>
      </div>

      <InsightSection
        title="Posture Improvements"
        description="Actionable changes to strengthen your email authentication posture."
        insights={groups.improvements}
      />
      <InsightSection
        title="Anomalies"
        description="Unusual patterns detected in your authentication data."
        insights={groups.anomalies}
      />
      <InsightSection
        title="Informational"
        description="Observations about your current configuration and traffic."
        insights={groups.informational}
      />

      <DiagnosticsRolloutPlanCard steps={data.rolloutPlan} />
    </>
  )
}
