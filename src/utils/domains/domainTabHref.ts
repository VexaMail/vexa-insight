/** URL of one tab of the domain page, keeping the sources window. */
export function domainTabHref(
  domainName: string,
  tab: string,
  query: Readonly<Record<string, string>> = {},
): string {
  const params = new URLSearchParams({ tab, ...query })
  return `/domains/${encodeURIComponent(domainName)}?${params.toString()}`
}
