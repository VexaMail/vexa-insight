import type { IngestTabsPlaceholderProps } from './IngestTabsPlaceholderProps'

/** What the poll results tab shows when there is no progress node. */
export function IngestTabsPlaceholder({
  isHistoricalJobContext,
}: Readonly<IngestTabsPlaceholderProps>) {
  return (
    <div className="glass-card p-8 text-center">
      <p className="text-muted-foreground">
        {isHistoricalJobContext
          ? 'Detailed poll logs are only maintained for the active or most recent run. You are viewing a historical run.'
          : 'No active poll. Select a Job Run to inspect its progress, or trigger a new poll.'}
      </p>
    </div>
  )
}
