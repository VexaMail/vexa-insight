import type { DomainsKpis } from '@/types/domains'

export type DomainsKpiStripProps = {
  readonly kpis: DomainsKpis
  readonly staleDays: number
  /** Messages per UTC day over the last 30 days, all listed domains. */
  readonly dailyVolume: readonly number[]
}
