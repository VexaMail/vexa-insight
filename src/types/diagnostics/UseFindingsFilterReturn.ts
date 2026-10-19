import type { DiagnosticsFinding } from './DiagnosticsFinding'
import type { FindingSeverityFilter } from './FindingSeverityFilter'

export type UseFindingsFilterReturn = {
  readonly severity: FindingSeverityFilter
  readonly setSeverity: (value: string) => void
  readonly search: string
  readonly setSearch: (value: string) => void
  /** The findings that match both the severity and the search text. */
  readonly visible: readonly DiagnosticsFinding[]
}
