'use client'

import AiLoadingSkeleton from './AiLoadingSkeleton'
import { AiReportInsightsHeading } from './AiReportInsightsHeading'
import type { AiReportInsightsPendingCardProps } from './AiReportInsightsPendingCardProps'

export function AiReportInsightsPendingCard({
  isTimedOut,
}: Readonly<AiReportInsightsPendingCardProps>) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-3 flex items-center gap-2">
        <AiReportInsightsHeading />
      </div>
      {isTimedOut ? (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Analysis is taking longer than expected. You can continue reviewing
          sources below.
        </p>
      ) : (
        <AiLoadingSkeleton />
      )}
    </div>
  )
}
