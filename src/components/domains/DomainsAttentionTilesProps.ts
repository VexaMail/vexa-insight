import type { DomainsKpis } from '@/types/domains'

export type DomainsAttentionTilesProps = {
  readonly kpis: DomainsKpis
  readonly staleDays: number
}
