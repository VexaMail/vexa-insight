import type { DomainSummary } from '@/types/reports'

export type DomainsSummaryPayload = {
  overall: unknown
  domains: DomainSummary[]
}
