/**
 * Shifts a rate series so its own range fills the sparkline: the primitive
 * scales from zero, which draws 96-99% as a flat line. A sparkline has no
 * axis, so only the shape is shown either way.
 */
export function sparklineShape(values: readonly number[]): number[] {
  if (values.length === 0) return []
  const min = Math.min(...values)
  const max = Math.max(...values)
  const floor = min - Math.max((max - min) * 0.25, 0.5)
  return values.map((value) => value - floor)
}
