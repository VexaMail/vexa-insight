import { NEW_FAILING_SOURCE_MIN_FAILED } from '@/constants/dashboard'
import type { SourcePeriodRow } from '@/types/dashboard'

/** A source failing DMARC for a domain now that did not fail for it before. */
export function isNewlyFailingSource(row: SourcePeriodRow): boolean {
  return (
    row.currentFailed >= NEW_FAILING_SOURCE_MIN_FAILED &&
    row.previousFailed === 0
  )
}
