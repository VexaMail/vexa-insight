/** "96.8%", or a dash when the rate is undefined for want of messages. */
export function formatRate(rate: number | null): string {
  return rate === null ? '—' : `${rate.toFixed(1)}%`
}
