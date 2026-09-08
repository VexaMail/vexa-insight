'use client'

import { useAiDiagnosticsInsightsPanel } from '@/hooks/ai'
import { AiDiagnosticsInsightsBody } from './AiDiagnosticsInsightsBody'
import type { AiDiagnosticsInsightsPanelProps } from './AiDiagnosticsInsightsPanelProps'
import { DiagnosticsAdminRunbook } from './DiagnosticsAdminRunbook'

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

  return (
    <div className="space-y-4">
      <DiagnosticsAdminRunbook
        domainName={domainName}
        score={score}
        stats={stats}
        guides={guides}
      />
      <AiDiagnosticsInsightsBody
        isAiConfigured={isAiConfigured}
        state={state}
        onAnalyze={handleAnalyze}
      />
    </div>
  )
}
