import type { DomainSummary } from '@/types/reports'

export type TopDomainRowProps = {
  readonly domain: DomainSummary
  readonly maxMessages: number
}
