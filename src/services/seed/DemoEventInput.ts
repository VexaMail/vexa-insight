import type { DemoSource } from './DemoSource'

export type DemoEventInput = {
  readonly rawReportId: number
  readonly domainId: number
  readonly ipId: number
  readonly source: DemoSource
  readonly reportBeginDate: number
  readonly reportEndDate: number
  readonly now: Date
}
