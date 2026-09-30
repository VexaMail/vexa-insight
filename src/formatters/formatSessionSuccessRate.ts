/**
 * Share of successful sessions as a percentage with one decimal, or `-`
 * when no session was reported at all.
 */
export function formatSessionSuccessRate(
  successful: number,
  failed: number,
): string {
  const total = successful + failed
  if (total === 0) return '-'
  return `${((successful / total) * 100).toFixed(1)}%`
}
