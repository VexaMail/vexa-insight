/** Placeholder shown while the first page of reports is loading. */
export function ReportsTableLoading() {
  return (
    <div className="glass-card p-8 text-center">
      <div className="animate-pulse space-y-3">
        <div className="bg-muted mx-auto h-4 w-1/3 rounded" />
        <div className="bg-muted mx-auto h-4 w-1/2 rounded" />
      </div>
      <p className="text-muted-foreground mt-4 text-sm">Loading reports…</p>
    </div>
  )
}
