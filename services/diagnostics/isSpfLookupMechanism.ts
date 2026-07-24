/**
 * Returns true when an SPF term (qualifier already stripped) consumes a DNS
 * lookup per RFC 7208 section 4.6.4: include, redirect, a, mx, and exists.
 */
export function isSpfLookupMechanism(term: string): boolean {
  return (
    term.startsWith('include:') ||
    term.startsWith('redirect=') ||
    term.startsWith('exists:') ||
    term === 'a' ||
    term.startsWith('a:') ||
    term.startsWith('a/') ||
    term === 'mx' ||
    term.startsWith('mx:') ||
    term.startsWith('mx/')
  )
}
