import type { DiagnosticsFinding } from './DiagnosticsFinding'

/**
 * The part of one protocol's finding the diagnostics index shows: enough for a
 * coloured dot and the count of checks that need a change, small enough to
 * store and send for thousands of domains.
 */
export type DiagnosticsProtocolState = Pick<
  DiagnosticsFinding,
  'id' | 'protocol' | 'severity' | 'state' | 'tileValue'
>
