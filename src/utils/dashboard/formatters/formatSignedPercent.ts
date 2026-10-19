/** "+12%", "-3.4%" or "0%": a relative change with its sign. */
export function formatSignedPercent(value: number): string {
  const rounded =
    Math.abs(value) >= 10 ? Math.round(value) : Number(value.toFixed(1))
  if (rounded === 0) return '0%'
  return `${rounded > 0 ? '+' : ''}${String(rounded)}%`
}
