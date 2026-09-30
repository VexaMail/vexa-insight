import type { DomainSource } from '@/types/reports'
import { classifySender } from '@/utils/senders'
import { regionNames } from './regionNames'

/** Maps one aggregated source row to a DomainSource, naming its sender. */
export function toDomainSource(
  row: {
    ip: string
    countryCode: string | null
    count: number
    hostname: string | null
  },
  dkimDomains: readonly string[],
): DomainSource {
  let countryName: string | undefined
  if (row.countryCode) {
    try {
      countryName = regionNames.of(row.countryCode)
    } catch {
      countryName = row.countryCode
    }
  }
  return {
    sourceIp: row.ip,
    count: row.count,
    countryCode: row.countryCode ?? undefined,
    countryName,
    hostname: row.hostname ?? undefined,
    sender:
      classifySender({ hostname: row.hostname, dkimDomains }) ?? undefined,
  }
}
