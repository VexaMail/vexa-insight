import type { DiagnosticsFindingSeverity } from './DiagnosticsFindingSeverity'
import type { DiagnosticsRecordFix } from './DiagnosticsRecordFix'
import type { DiagnosticsSectionId } from './DiagnosticsSectionId'
import type { DomainScoreCheck } from './DomainScoreCheck'

/**
 * One protocol check of the live DNS run: what was observed, how urgent it is
 * and what to do. The status tiles and the findings table read the same object.
 */
export type DiagnosticsFinding = {
  readonly id: DomainScoreCheck['id']
  /** Protocol name for the tile, e.g. "DKIM". */
  readonly protocol: string
  /** What was checked, e.g. "DKIM selectors". */
  readonly check: string
  readonly severity: DiagnosticsFindingSeverity
  /** One-line observed state, e.g. "p=none (monitoring only)". */
  readonly state: string
  /** Supporting sentence under the state. */
  readonly detail: string
  /** The published record, shown in mono; null when nothing is published. */
  readonly observed: string | null
  readonly recommendation: string
  /** A record that can be copied and published unchanged, when one is known. */
  readonly fix: DiagnosticsRecordFix | null
  /** Short state word for the status tile. */
  readonly tileValue: string
  /** Short subtitle for the status tile. */
  readonly tileHint: string
  /** Detail section that holds the evidence. */
  readonly section: DiagnosticsSectionId
}
