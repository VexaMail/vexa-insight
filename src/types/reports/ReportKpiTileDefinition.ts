import type { StatusTone } from '@/types/ui'

/** One figure of the report KPI strip, with what it is out of. */
export type ReportKpiTileDefinition = {
  readonly label: string
  readonly value: string
  readonly hint: string
  readonly tone: StatusTone
}
