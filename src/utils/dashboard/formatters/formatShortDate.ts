/** "Oct 17, 2026" in UTC, so server and browser render the same text. */
export function formatShortDate(ms: number): string {
  return new Date(ms).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
