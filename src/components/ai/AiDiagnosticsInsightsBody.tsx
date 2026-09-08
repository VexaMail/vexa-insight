'use client'

import { AiDiagnosticsIdleCard } from './AiDiagnosticsIdleCard'
import type { AiDiagnosticsInsightsBodyProps } from './AiDiagnosticsInsightsBodyProps'
import { AiDiagnosticsLoadingCard } from './AiDiagnosticsLoadingCard'
import { AiDiagnosticsResults } from './AiDiagnosticsResults'
import AiEmptyState from './AiEmptyState'
import AiErrorState from './AiErrorState'
import { AiInsightsNotice } from './AiInsightsNotice'
import AiNotConfiguredCta from './AiNotConfiguredCta'

/** Everything the diagnostics panel renders below the admin runbook. */
export function AiDiagnosticsInsightsBody({
  isAiConfigured,
  state,
  onAnalyze,
}: AiDiagnosticsInsightsBodyProps) {
  if (!isAiConfigured) return <AiNotConfiguredCta />
  if (state.status === 'idle')
    return <AiDiagnosticsIdleCard onAnalyze={onAnalyze} />
  if (state.status === 'loading') return <AiDiagnosticsLoadingCard />
  if (state.status === 'error')
    return (
      <AiInsightsNotice>
        <AiErrorState message={state.error.message} onRetry={onAnalyze} />
      </AiInsightsNotice>
    )
  if (state.data.insights.length === 0)
    return (
      <AiInsightsNotice>
        <AiEmptyState />
      </AiInsightsNotice>
    )

  return <AiDiagnosticsResults data={state.data} onAnalyze={onAnalyze} />
}
