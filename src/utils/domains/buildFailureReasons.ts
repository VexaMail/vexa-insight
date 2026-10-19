import { FAILURE_REASON_LABELS } from '@/constants/domains'
import type { DomainSourceRow, FailureReason } from '@/types/domains'

/** Why the failing mail of these sources failed, largest reason first. */
export function buildFailureReasons(
  rows: readonly DomainSourceRow[],
): FailureReason[] {
  const sum = (pick: (row: DomainSourceRow) => number) =>
    rows.reduce((total, row) => total + pick(row), 0)
  const reasons: FailureReason[] = [
    {
      key: 'spf-auth',
      label: FAILURE_REASON_LABELS['spf-auth'],
      messages: sum((r) => r.auth?.failSpfAuth ?? 0),
    },
    {
      key: 'spf-unaligned',
      label: FAILURE_REASON_LABELS['spf-unaligned'],
      messages: sum((r) => r.auth?.failSpfUnaligned ?? 0),
    },
    {
      key: 'dkim-none',
      label: FAILURE_REASON_LABELS['dkim-none'],
      messages: sum((r) => r.auth?.failDkimNone ?? 0),
    },
    {
      key: 'dkim-unaligned',
      label: FAILURE_REASON_LABELS['dkim-unaligned'],
      messages: sum((r) => r.auth?.failDkimUnaligned ?? 0),
    },
  ]
  return reasons
    .filter((reason) => reason.messages > 0)
    .sort((a, b) => b.messages - a.messages)
}
