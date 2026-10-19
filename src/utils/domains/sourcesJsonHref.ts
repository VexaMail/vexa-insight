/** Where the sources of a domain download as JSON, over the same window. */
export function sourcesJsonHref(domainId: number, days?: number): string {
  const window = days == null ? '' : `?days=${String(days)}`
  return `/api/v1/domains/${String(domainId)}/sources${window}`
}
