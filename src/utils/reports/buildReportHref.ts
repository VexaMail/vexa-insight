/** Detail URL of a report, remembering the domain it was opened from. */
export function buildReportHref(
  reportId: number,
  domainName: string | undefined,
): string {
  const base = `/reports/${String(reportId)}`
  return domainName
    ? `${base}?fromDomain=${encodeURIComponent(domainName)}`
    : base
}
