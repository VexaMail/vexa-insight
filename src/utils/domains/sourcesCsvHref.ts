/** Where the sources of a domain download as CSV, over the same window. */
export function sourcesCsvHref(domainId: number, days?: number): string {
  const window = days == null ? '' : `&days=${String(days)}`
  return `/api/v1/domains/${String(domainId)}/sources?format=csv${window}`
}
