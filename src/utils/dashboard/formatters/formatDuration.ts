/** "12s", "4m 12s" or "1h 5m". */
export function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000)
  if (seconds < 60) return `${String(seconds)}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${String(minutes)}m ${String(seconds % 60)}s`
  return `${String(Math.floor(minutes / 60))}h ${String(minutes % 60)}m`
}
