/**
 * Returns true when the record contains an `all` mechanism (with any
 * qualifier). RFC 7208 section 6.1 makes this decisive for `redirect=`:
 * a redirect MUST be ignored when an `all` is present, regardless of the
 * relative ordering of the two terms.
 */
export function hasSpfAllMechanism(record: string): boolean {
  return record
    .trim()
    .split(/\s+/)
    .slice(1)
    .some((term) => term.replace(/^[+\-~?]/, '') === 'all')
}
