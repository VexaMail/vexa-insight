export function JobRunHistoryEmptyState() {
  return (
    <div className="glass-card p-8 text-center">
      <p className="text-muted-foreground">
        No job runs recorded yet. Trigger a poll or wait for the scheduled run.
      </p>
    </div>
  )
}
