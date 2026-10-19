/**
 * A report boundary in Unix seconds as `Oct 16, 2026 00:00 UTC`: fixed
 * English format in UTC, the zone DMARC report periods are written in, so a
 * server render and hydration agree.
 */
export function formatReportTimestamp(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000)
  const date = d.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return `${date} ${d.toISOString().slice(11, 16)} UTC`
}
