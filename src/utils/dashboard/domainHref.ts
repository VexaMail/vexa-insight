/** Detail page of a monitored domain. */
export function domainHref(domainName: string): string {
  return `/domains/${encodeURIComponent(domainName)}`
}
