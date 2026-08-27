import type { NormalizedEventSummary } from './NormalizedEventSummary'

export type ReportAnalysisInput = {
  reportId: number
  orgName: string
  beginDate: number
  endDate: number
  rawXml: string
  relatedDomains: { domainId: number; domainName: string }[]
  events: NormalizedEventSummary[]
}
