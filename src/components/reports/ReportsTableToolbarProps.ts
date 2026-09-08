import type { ReportsTableAction } from '@/types/reports'

export type ReportsTableToolbarProps = {
  readonly search: string
  readonly filterOrg: string
  readonly filterDomain: string
  readonly orgOptions: string[]
  readonly domainOptions: string[]
  readonly showDomainFilter: boolean
  readonly dispatch: React.Dispatch<ReportsTableAction>
  readonly updateUrlParams: (key: string, value: string) => void
}
