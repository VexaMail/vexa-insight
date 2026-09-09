import { getDb, ipAddresses } from '@/lib/db'
import type { GeoipLookup } from '@/types/geoip'
import { lookupCountryCode } from './lookupCountryCode'
import { newIpRow } from './newIpRow'

/** Inserts unseen addresses in one statement and returns their ids. */
export async function insertNewIpRows(
  geoip: GeoipLookup,
  ips: string[],
  now: Date,
): Promise<{ id: number; ip: string }[]> {
  if (ips.length === 0) return []
  return getDb()
    .insert(ipAddresses)
    .values(ips.map((ip) => newIpRow(ip, lookupCountryCode(geoip, ip), now)))
    .returning({ id: ipAddresses.id, ip: ipAddresses.ip })
}
