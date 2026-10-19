/** Relative change in percent; null when there is no baseline to divide by. */
export function percentChange(
  current: number,
  previous: number | null,
): number | null {
  if (previous === null || previous <= 0) return null
  return ((current - previous) / previous) * 100
}
