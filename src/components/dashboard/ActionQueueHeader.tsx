/** Column labels of the queue, shown from `lg` where rows are columns. */
export function ActionQueueHeader() {
  return (
    <div
      aria-hidden
      className="text-muted-foreground hidden grid-cols-[88px_minmax(0,1fr)_minmax(0,1.35fr)_84px_92px_16px] gap-x-3 px-4 pb-1.5 text-[11px] font-medium lg:grid"
    >
      <span>Severity</span>
      <span>Domain / source</span>
      <span>Issue</span>
      <span className="text-right">Impact</span>
      <span>Last seen</span>
      <span />
    </div>
  )
}
