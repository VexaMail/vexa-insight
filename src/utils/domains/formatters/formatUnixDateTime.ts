/** `2026-01-31 12:00 UTC`: the same text on server and client. */
export function formatUnixDateTime(unixSeconds: number): string {
  return `${new Date(unixSeconds * 1000).toISOString().slice(0, 16).replace('T', ' ')} UTC`
}
