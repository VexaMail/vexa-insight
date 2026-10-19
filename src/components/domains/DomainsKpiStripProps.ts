import type { DomainsKpis } from '@/types/domains'

export type DomainsKpiStripProps = {
  readonly kpis: DomainsKpis
  readonly staleDays: number
}
