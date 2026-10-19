/** "Oct 19, 2026 at 08:12 (UTC)", or "Never" without a date. */
export function formatUtcTime(date: Date | null): string {
  if (!date) return 'Never'
  const day = date.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const time = date.toISOString().slice(11, 16)
  return `${day} at ${time} (UTC)`
}
