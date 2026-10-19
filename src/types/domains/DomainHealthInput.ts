import type { DomainSummary } from '@/types/reports'

/** What the status band of a domain is read from. */
export type DomainHealthInput = Pick<
  DomainSummary,
  'totalMessages' | 'passRatePercent'
>
