/** One decimal, so a chart tooltip reads "96.8" and not 96.81234. */
export function roundRate(rate: number | null): number | null {
  return rate === null ? null : Math.round(rate * 10) / 10
}
