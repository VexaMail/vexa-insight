import { isPrivateIpv4 } from './isPrivateIpv4'

/**
 * Returns true for IPv6 loopback, link-local, ULA, multicast, and IPv4-mapped
 * addresses whose embedded IPv4 is private.
 */
export function isPrivateIpv6(ip: string): boolean {
  const lower = ip.toLowerCase()
  if (lower === '::' || lower === '::1') return true
  // eslint-disable-next-line sonarjs/no-hardcoded-ip
  if (lower.startsWith('fe80:') || lower.startsWith('fe80::')) return true
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true
  if (lower.startsWith('ff')) return true
  const match = /^::ffff:([0-9.]+)$/.exec(lower)
  if (match && match[1]) return isPrivateIpv4(match[1])
  return false
}
