'use client'

import AiLoadingSkeleton from './AiLoadingSkeleton'
import { AiReportInsightsHeading } from './AiReportInsightsHeading'
import type { AiReportInsightsPendingCardProps } from './AiReportInsightsPendingCardProps'

export function AiReportInsightsPendingCard({
  isTimedOut,
}: Readonly<AiReportInsightsPendingCardProps>) {
  return (
    <div className="glass-card p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <AiReportInsightsHeading />
      </div>
      {isTimedOut ? (
        <p className="text-warning text-sm">
          Analysis is taking longer than expected. You can continue reviewing
          sources below.
        </p>
      ) : (
        <AiLoadingSkeleton />
      )}
    </div>
  )
}
