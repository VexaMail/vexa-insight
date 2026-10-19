/** "just now", "12 minutes ago", "3 hours ago" or "2 days ago". */
export function formatRelativeAge(iso: string, nowMs: number): string {
  const minutes = Math.floor((nowMs - new Date(iso).getTime()) / 60_000)
  if (minutes < 1) return 'just now'
  const unit = (value: number, name: string) =>
    `${String(value)} ${name}${value === 1 ? '' : 's'} ago`
  if (minutes < 60) return unit(minutes, 'minute')
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return unit(hours, 'hour')
  return unit(Math.floor(hours / 24), 'day')
}
