'use client'

import { AiInsightsHeading } from './AiInsightsHeading'
import type { AiInsightsNoticeProps } from './AiInsightsNoticeProps'

/** Titled wrapper for the error and empty states of the diagnostics panel. */
export function AiInsightsNotice({ children }: AiInsightsNoticeProps) {
  return (
    <div className="glass-card space-y-3 p-4">
      <div className="flex items-center gap-2.5">
        <AiInsightsHeading />
      </div>
      {children}
    </div>
  )
}
