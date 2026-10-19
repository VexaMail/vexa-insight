/** The later of two optional timestamps; null when both are missing. */
export function latestMs(a: number | null, b: number | null): number | null {
  if (a === null) return b
  if (b === null) return a
  return Math.max(a, b)
}
