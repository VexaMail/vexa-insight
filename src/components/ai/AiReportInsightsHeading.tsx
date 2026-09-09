'use client'

/** The sparkle and title shared by every state of the report panel. */
export function AiReportInsightsHeading() {
  return (
    <>
      <span className="text-lg" aria-hidden="true">
        ✨
      </span>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        AI Insights
      </h3>
    </>
  )
}
