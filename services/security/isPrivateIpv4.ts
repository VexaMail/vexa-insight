import { ipv4ToInt } from './ipv4ToInt'
import { V4_PRIVATE_RANGES } from './v4PrivateRanges'

/**
 * Returns true if the IPv4 literal falls in any private/reserved range.
 */
export function isPrivateIpv4(ip: string): boolean {
  const n = ipv4ToInt(ip)
  if (n === null) return false
  return V4_PRIVATE_RANGES.some(([lo, hi]) => n >= lo && n <= hi)
}
