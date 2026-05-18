import net from 'node:net'
import { isPrivateIpv4 } from './isPrivateIpv4'
import { isPrivateIpv6 } from './isPrivateIpv6'

/**
 * Returns true if the given IP literal is private, loopback, link-local,
 * CGNAT, multicast, broadcast, or a documentation/benchmarking range.
 * Returns false for unparseable input (callers should validate upstream).
 */
export function isPrivateIp(ip: string): boolean {
  const v = net.isIP(ip)
  if (v === 4) return isPrivateIpv4(ip)
  if (v === 6) return isPrivateIpv6(ip)
  return false
}
