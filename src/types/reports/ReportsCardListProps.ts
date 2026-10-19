import type { ReportRow } from './ReportRow'

export type ReportsCardListProps = {
  readonly rows: ReportRow[]
  readonly domainName: string | undefined
}
