'use client'

import { mapDiagnosticsInsightToRenderable } from '@/mappers/ai'
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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <AiInsightsHeading />
          <span className="text-muted-foreground text-xs">
            {data.insights.length} findings · {data.metadata.model} ·{' '}
            {data.metadata.durationMs}ms
          </span>
        </div>
        <button
          type="button"
          onClick={onAnalyze}
          className="shrink-0 rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 print:hidden"
        >
          Re-analyze
        </button>
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
