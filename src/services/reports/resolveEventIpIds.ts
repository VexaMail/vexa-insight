import { upsertIpsBatch } from '@/services/geoip'
import type { ParseResult } from '@/types/dmarc'
import { normalizeIp } from '@/utils/geoip'

/**
 * Resolves one ip_addresses id per event, positionally.
 *
 * Runs before the ingest transaction: better-sqlite3 transaction callbacks must
 * be synchronous, so every await has to happen first. `upsertIpsBatch` dedupes
 * internally and resolves all unique source IPs in a few set-based statements.
 */
export async function resolveEventIpIds(
  events: ParseResult['events'],
): Promise<number[]> {
  const ipIdByValue = await upsertIpsBatch(events.map((ev) => ev.sourceIp))

  return events.map((ev) => {
    const id = ipIdByValue.get(normalizeIp(ev.sourceIp))
    if (id == null) throw new Error(`Missing ipAddressId for ${ev.sourceIp}`)
    return id
  })
}
