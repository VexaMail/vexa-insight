/** "in 32 minutes", "in 2 hours" for a time ahead of now. */
export function formatRelativeMinutes(targetMs: number, nowMs: number): string {
  const minutes = Math.max(0, Math.round((targetMs - nowMs) / 60_000))
  if (minutes < 1) return 'in under a minute'
  if (minutes < 90)
    return `in ${String(minutes)} minute${minutes === 1 ? '' : 's'}`
  return `in ${String(Math.round(minutes / 60))} hours`
}
