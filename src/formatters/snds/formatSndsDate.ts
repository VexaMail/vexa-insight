/** A date as SNDS wants it in paths: yyyy-MM-dd, in UTC. */
export function formatSndsDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}
