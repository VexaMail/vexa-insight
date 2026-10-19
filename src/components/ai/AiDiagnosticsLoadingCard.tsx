'use client'

import { AiInsightsHeading } from './AiInsightsHeading'
import AiLoadingSkeleton from './AiLoadingSkeleton'

export function AiDiagnosticsLoadingCard() {
  return (
    <div className="glass-card p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <AiInsightsHeading />
      </div>
      <AiLoadingSkeleton />
    </div>
  )
}
