/**
 * Percentage of `part` over `total`, rounded to one decimal; 0 when there is
 * no total.
 */
export function percentOf(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 1000) / 10 : 0
}
