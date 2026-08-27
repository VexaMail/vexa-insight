import type { DomainsTableRow } from '@/types/domains'

export type GetDomainsColumnsParams = {
  setScope: (ids: string[]) => void
  filtered: DomainsTableRow[]
}
