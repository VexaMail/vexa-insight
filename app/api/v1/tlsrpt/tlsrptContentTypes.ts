/** Media types RFC 8460 section 5.2 lets a sender POST a report with. */
export const TLSRPT_CONTENT_TYPES: ReadonlySet<string> = new Set([
  'application/tlsrpt+json',
  'application/tlsrpt+gzip',
])
