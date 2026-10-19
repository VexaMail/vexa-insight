/** "Oct 19, 2026, 3:00 AM" in the server's time zone. */
export function formatDateTime(ms: number): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(ms))
}
