/** Pass and fail keys of the trend chart. */
export function PassRateTrendLegend() {
  return (
    <span className="text-muted-foreground hidden items-center gap-3 text-xs sm:flex">
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="bg-success h-2 w-2 rounded-full" />
        Pass rate
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="bg-danger h-2 w-2 rounded-full" />
        Fail rate
      </span>
    </span>
  )
}
