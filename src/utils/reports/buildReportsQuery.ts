import type { FetchReportsParams } from '@/types/reports'

/** Merges the date filter with paging and the optional narrowing filters. */
export function buildReportsQuery({
  page,
  pageSize,
  dateFilterParams,
  org,
  domain,
  domainId,
}: FetchReportsParams): string {
  const params = new URLSearchParams(dateFilterParams)
  params.set('page', String(page))
  params.set('pageSize', String(pageSize))
  if (domainId) params.set('domainId', String(domainId))
  if (org) params.set('org', org)
  if (domain) params.set('domain', domain)

  return params.toString()
}
