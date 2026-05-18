/**
 * Returns true if the lowercased IPv6 literal falls in the link-local range
 * fe80::/10, i.e. the first 16-bit group is in [0xfe80, 0xfebf]. The naive
 * `startsWith('fe80:')` check misses fe81–febf, which are also link-local.
 */
export function isIpv6LinkLocal(lower: string): boolean {
  const firstGroup = lower.split(':', 1)[0]
  if (!firstGroup) return false
  const value = Number.parseInt(firstGroup, 16)
  if (!Number.isFinite(value)) return false
  return value >= 0xfe80 && value <= 0xfebf
}
