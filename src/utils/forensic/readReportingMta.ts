/**
 * The reporting host: the `Reporting-MTA` field without its `dns;` type
 * prefix, else the authserv-id of the feedback part's Authentication-Results.
 */
export function readReportingMta(
  reportingMta: string | null,
  authResults: string | null,
): string | null {
  const fromField = reportingMta?.replace(/^\s*dns\s*;\s*/i, '').trim()
  if (fromField) return fromField.toLowerCase()
  const authServId = authResults?.split(';')[0]?.trim()
  return authServId ? authServId.toLowerCase() : null
}
