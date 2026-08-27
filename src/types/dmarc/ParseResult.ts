import type { NormalizedEventPayload } from './NormalizedEventPayload'
import type { RawReportPayload } from './RawReportPayload'
/**
 * Result of parsing a DMARC file: raw report metadata, domain name, and event rows.
 */
export type ParseResult = {
  rawReport: RawReportPayload
  domain: string
  events: NormalizedEventPayload[]
}
