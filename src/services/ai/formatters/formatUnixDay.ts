/** The YYYY-MM-DD of a unix timestamp in seconds. */
export function formatUnixDay(seconds: number): string {
  return new Date(seconds * 1000).toISOString().slice(0, 10)
}
