import type { DomainSource, DomainSummary } from '@/types/reports'

/**
 * Combined domain detail data (summary + stats + sources).
 */
export type DomainDetailData = {
  summary: DomainSummary
  stats: {
    totalMessages: number
    passedCount: number
    failedCount: number
    passRatePercent: number
  }
  sources: DomainSource[]
}
