/** Query string for the org options endpoint: the date filter plus domain. */
export function buildOrgOptionsQuery(
  dateFilterParams: string,
  domainId: number | undefined,
): string {
  const params = new URLSearchParams(dateFilterParams)
  if (domainId) params.set('domainId', String(domainId))
  return params.toString()
}
