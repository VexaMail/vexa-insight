/** A value's share of the largest value in the list, as a percentage. */
export function sharePercent(value: number, max: number): number {
  return max > 0 ? (value / max) * 100 : 0
}
