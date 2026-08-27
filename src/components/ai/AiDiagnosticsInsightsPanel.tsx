'use client'

import { mapDiagnosticsInsightToRenderable } from '@/mappers/ai'

import { useAiDiagnosticsInsightsPanel } from '@/hooks/ai'
import type { DiagnosticsRenderableInsight } from '@/types/ai'
import type { AiDiagnosticsInsightsPanelProps } from './AiDiagnosticsInsightsPanelProps'
import AiEmptyState from './AiEmptyState'
import AiErrorState from './AiErrorState'
import AiLoadingSkeleton from './AiLoadingSkeleton'
import AiNotConfiguredCta from './AiNotConfiguredCta'
import { DiagnosticsAdminRunbook } from './DiagnosticsAdminRunbook'
import { DiagnosticsRolloutPlanCard } from './DiagnosticsRolloutPlanCard'
import { groupInsightsByTone } from './groupInsightsByTone'
import { InsightSection } from './InsightSection'

export default function AiDiagnosticsInsightsPanel({
  domainName,
  domainId,
  isAiConfigured,
  score,
  stats,
  guides,
  startDate,
  endDate,
}: Readonly<AiDiagnosticsInsightsPanelProps>) {
  const { state, handleAnalyze } = useAiDiagnosticsInsightsPanel(
    domainName,
    domainId,
    startDate,
    endDate,
  )

  if (!isAiConfigured) {
    return (
      <div className="space-y-4">
        <DiagnosticsAdminRunbook
          domainName={domainName}
          score={score}
          stats={stats}
          guides={guides}
        />
        <AiNotConfiguredCta />
      </div>
    )
  }

  if (state.status === 'idle') {
    return (
      <div className="space-y-4">
        <DiagnosticsAdminRunbook
          domainName={domainName}
          score={score}
          stats={stats}
          guides={guides}
        />
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                ✨
              </span>
              <h3 className="text-base font-semibold">
                AI Diagnostics Insights
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAnalyze}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 print:hidden"
            >
              Analyze Domain
            </button>
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            The runbook above explains what to fix and how to validate it. AI
            adds correlation across DNS, historical statistics, and DMARC
            reports to prioritize less obvious causes.
          </p>
        </div>
      </div>
    )
  }

  if (state.status === 'loading') {
    return (
      <div className="space-y-4">
        <DiagnosticsAdminRunbook
          domainName={domainName}
          score={score}
          stats={stats}
          guides={guides}
        />
        <div className="bg-card rounded-lg border p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              ✨
            </span>
            <h3 className="text-base font-semibold">AI Diagnostics Insights</h3>
          </div>
          <AiLoadingSkeleton />
        </div>
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="space-y-4">
        <DiagnosticsAdminRunbook
          domainName={domainName}
          score={score}
          stats={stats}
          guides={guides}
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              ✨
            </span>
            <h3 className="text-base font-semibold">AI Diagnostics Insights</h3>
          </div>
          <AiErrorState message={state.error.message} onRetry={handleAnalyze} />
        </div>
      </div>
    )
  }

  if (state.data.insights.length === 0) {
    return (
      <div className="space-y-4">
        <DiagnosticsAdminRunbook
          domainName={domainName}
          score={score}
          stats={stats}
          guides={guides}
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              ✨
            </span>
            <h3 className="text-base font-semibold">AI Diagnostics Insights</h3>
          </div>
          <AiEmptyState />
        </div>
      </div>
    )
  }

  const renderableInsights: DiagnosticsRenderableInsight[] =
    state.data.insights.map(mapDiagnosticsInsightToRenderable)
  const groups = groupInsightsByTone(renderableInsights)

  return (
    <div className="space-y-4">
      <DiagnosticsAdminRunbook
        domainName={domainName}
        score={score}
        stats={stats}
        guides={guides}
      />

      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-lg" aria-hidden="true">
            ✨
          </span>
          <h3 className="text-base font-semibold">AI Diagnostics Insights</h3>
          <span className="text-muted-foreground text-xs">
            {state.data.insights.length} findings · {state.data.metadata.model}{' '}
            · {state.data.metadata.durationMs}ms
          </span>
        </div>
        <button
          type="button"
          onClick={handleAnalyze}
          className="shrink-0 rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 print:hidden"
        >
          Re-analyze
        </button>
      </div>

      {/* Grouped tone sections — render order: improvements → anomalies → informational */}
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

      {/* Ordered rollout plan — always rendered last */}
      <DiagnosticsRolloutPlanCard steps={state.data.rolloutPlan} />
    </div>
  )
}
