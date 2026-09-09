/**
 * Relaxed DKIM alignment: the signing domain equals the header From domain
 * or is one of its parent domains.
 */
export function isDkimDomainAligned(
  domain: string,
  headerFrom: string,
): boolean {
  return (
    domain.length > 0 &&
    headerFrom.length > 0 &&
    (domain === headerFrom || headerFrom.endsWith(`.${domain}`))
  )
}
