import type { DomainPeriodTotals } from '@/types/dashboard'

export type DomainRankRowProps = {
  readonly domain: DomainPeriodTotals
  /** Daily fail rate over the window, oldest first. */
  readonly trend: readonly number[] | undefined
}
