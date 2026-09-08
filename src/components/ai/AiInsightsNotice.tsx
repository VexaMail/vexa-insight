'use client'

import { AiInsightsHeading } from './AiInsightsHeading'
import type { AiInsightsNoticeProps } from './AiInsightsNoticeProps'

/** Titled wrapper for the error and empty states of the diagnostics panel. */
export function AiInsightsNotice({ children }: AiInsightsNoticeProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <AiInsightsHeading />
      </div>
      {children}
    </div>
  )
}
