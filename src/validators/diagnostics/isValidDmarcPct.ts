/**
 * `pct` must be a number from 0 to 100.
 */
export function isValidDmarcPct(value: string): boolean {
  const n = Number(value)
  return !Number.isNaN(n) && n >= 0 && n <= 100
}
