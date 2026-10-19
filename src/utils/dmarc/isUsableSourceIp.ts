import { normalizeIp } from '@/utils/geoip'
import { isIP } from 'node:net'

/**
 * True when the raw value normalizes to a literal IPv4 or IPv6 address that can
 * be stored in ip_addresses. Empty strings and free text are not usable.
 */
export function isUsableSourceIp(ipStr: string): boolean {
  return isIP(normalizeIp(ipStr)) !== 0
}
