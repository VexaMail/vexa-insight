import type { ParseResult } from '@/types/dmarc'
import { isUsableSourceIp } from './isUsableSourceIp'

/**
 * Returns the report with every event whose source IP is not a usable address
 * removed. A single malformed record must not fail the whole report, and
 * filtering before ingest keeps events and rollups computed from the same set.
 */
export function withUsableSourceIps(report: ParseResult): ParseResult {
  const events = report.events.filter((ev) => isUsableSourceIp(ev.sourceIp))
  if (events.length === report.events.length) return report
  return { ...report, events }
}
