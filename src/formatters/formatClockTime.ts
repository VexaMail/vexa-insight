/** `08:12 UTC`: the minute of a timestamp, always in UTC. */
export function formatClockTime(date: Date): string {
  return `${date.toISOString().slice(11, 16)} UTC`
}
