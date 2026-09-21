import type { IngestTabsPlaceholderProps } from './IngestTabsPlaceholderProps'

/** What the poll results tab shows when there is no progress node. */
export function IngestTabsPlaceholder({
  isHistoricalJobContext,
}: Readonly<IngestTabsPlaceholderProps>) {
  return (
    <div className="glass-card p-8 text-center">
      <p className="text-muted-foreground">
        {isHistoricalJobContext
          ? 'This run has finished. Step-by-step poll logs are kept only while a run is active; its totals are in Job Runs.'
          : 'No poll is running. Pick a job run to inspect its progress, or trigger a new poll.'}
      </p>
    </div>
  )
}
