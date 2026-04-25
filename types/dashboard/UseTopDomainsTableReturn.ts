import type { DomainSummary } from '@/types/reports'

export type UseTopDomainsTableReturn = {
  readonly maxMessages: number
  readonly topDomains: DomainSummary[]
  readonly isLoading: boolean
}
