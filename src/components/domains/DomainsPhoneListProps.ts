import type { DomainsTableRow } from '@/types/domains'

export type DomainsPhoneListProps = {
  readonly rows: readonly DomainsTableRow[]
  readonly onNavigate: () => void
}
