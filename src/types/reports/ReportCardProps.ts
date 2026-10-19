import type { ReportRow } from './ReportRow'

export type ReportCardProps = {
  readonly row: ReportRow
  readonly domainName: string | undefined
  readonly scopeIds: string[]
}
