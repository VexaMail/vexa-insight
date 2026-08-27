import { isIpv6LinkLocal } from './isIpv6LinkLocal'
import { isPrivateIpv4 } from './isPrivateIpv4'
import { parseIpv4MappedHex } from './parseIpv4MappedHex'

/**
 * Returns true for IPv6 loopback, link-local, ULA, multicast, and IPv4-mapped
 * addresses whose embedded IPv4 is private.
 */
export function isPrivateIpv6(ip: string): boolean {
  const lower = ip.toLowerCase()
  if (lower === '::' || lower === '::1') return true
  if (isIpv6LinkLocal(lower)) return true
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true
  if (lower.startsWith('ff')) return true
  const dottedMatch = /^::ffff:([0-9.]+)$/.exec(lower)
  if (dottedMatch && dottedMatch[1]) return isPrivateIpv4(dottedMatch[1])
  const hexMapped = parseIpv4MappedHex(lower)
  if (hexMapped !== null) return isPrivateIpv4(hexMapped)
  return false
}
