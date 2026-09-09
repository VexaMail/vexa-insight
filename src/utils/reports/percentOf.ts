/**
 * Whole-number percentage of `part` over `total`; 0 when there is no total.
 */
export function percentOf(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0
}
