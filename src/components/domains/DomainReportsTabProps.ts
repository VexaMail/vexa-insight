import type { DomainSummary } from '@/types/reports'

export type DomainReportsTabProps = {
  readonly domainId: number
  readonly domainName: string
  readonly summary: DomainSummary
}
