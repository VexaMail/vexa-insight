/**
 * A share or rate already in percent as `91.3%`, always with one decimal so
 * `0.0%` and `100.0%` line up with every other figure.
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}
