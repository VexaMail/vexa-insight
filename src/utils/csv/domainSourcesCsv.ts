import type { DomainSource } from '@/types/reports'
import { toCsv } from './toCsv'

/** A domain's sources as CSV, one row per source IP. */
export function domainSourcesCsv(sources: readonly DomainSource[]): string {
  return toCsv(sources, [
    { header: 'source_ip', value: (s) => s.sourceIp },
    { header: 'messages', value: (s) => s.count },
    { header: 'hostname', value: (s) => s.hostname },
    { header: 'country', value: (s) => s.countryCode },
    { header: 'sender', value: (s) => s.sender?.name },
    { header: 'sender_category', value: (s) => s.sender?.category },
  ])
}
