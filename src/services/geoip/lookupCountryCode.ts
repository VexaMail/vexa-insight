import type { GeoipLookup } from '@/types/geoip'

/** The address's country per the local GeoIP data, or null when unknown. */
export function lookupCountryCode(
  geoip: GeoipLookup,
  ip: string,
): string | null {
  return geoip.lookup(ip)?.country || null
}
