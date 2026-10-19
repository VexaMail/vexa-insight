import type { StatusTone } from '@/types/ui'

/** What the status pill of a domain says: its band, led by its freshness. */
export type DomainHealthBadge = {
  readonly tone: StatusTone
  readonly label: string
  readonly title: string
  /** True when the band is historical: no report for too long. */
  readonly stale: boolean
}
