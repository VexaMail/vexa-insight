/** Detail page of a sending IP. */
export function sourceHref(ip: string): string {
  return `/ips/${encodeURIComponent(ip)}`
}
