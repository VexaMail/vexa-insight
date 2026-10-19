/** "+12.0%", "-3.4%" or "0.0%": a relative change with its sign. */
export function formatSignedPercent(value: number): string {
  const rounded = Number(value.toFixed(1))
  if (rounded === 0) return '0.0%'
  return `${rounded > 0 ? '+' : ''}${rounded.toFixed(1)}%`
}
