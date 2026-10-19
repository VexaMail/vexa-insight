/** "+0.4 pts": the difference between two percentages, in points. */
export function formatPointChange(value: number): string {
  const rounded = Number(value.toFixed(1))
  if (rounded === 0) return '0 pts'
  return `${rounded > 0 ? '+' : ''}${rounded.toFixed(1)} pts`
}
