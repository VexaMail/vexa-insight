import type { DiagnosticsFindingSeverity } from './DiagnosticsFindingSeverity'

/** The severity filter of the findings panel; `all` shows every check. */
export type FindingSeverityFilter = 'all' | DiagnosticsFindingSeverity
