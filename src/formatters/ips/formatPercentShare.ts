/** `12.5%` of `total`, `0.0%` when there is nothing to share. */
export function formatPercentShare(count: number, total: number): string {
  return `${(total > 0 ? (count / total) * 100 : 0).toFixed(1)}%`
}
