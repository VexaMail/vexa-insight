/** A complaint rate fraction as a percentage for display. */
export function formatSndsRate(rate: number | null): string {
  if (rate === null) return '-'
  return `${(rate * 100).toFixed(2)}%`
}
