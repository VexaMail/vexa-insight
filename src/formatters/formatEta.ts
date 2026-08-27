/**
 * Formats ETA milliseconds as human-readable string (e.g. "2m 30s", "45s", "1h 5m").
 */
export function formatEta(ms: number): string {
  if (ms <= 0) return 'Calculating…'
  const secs = Math.round(ms / 1000)
  if (secs < 60) return `${String(secs)}s`
  const m = Math.floor(secs / 60)
  const s = secs % 60
  if (m < 60) return `${String(m)}m ${String(s)}s`
  const h = Math.floor(m / 60)
  const m2 = m % 60
  return `${String(h)}h ${String(m2)}m`
}
