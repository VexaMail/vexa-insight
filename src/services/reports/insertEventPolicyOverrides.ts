import { normalizedEventPolicyOverrides } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import type { ReportTransaction } from '@/types/reports'

export function insertEventPolicyOverrides(
  tx: ReportTransaction,
  eventId: number,
  policyOverrides: ParseResult['events'][number]['policyOverrides'],
): void {
  if (policyOverrides.length === 0) return

  tx.insert(normalizedEventPolicyOverrides)
    .values(
      policyOverrides.map((override) => ({
        eventId,
        type: override.type,
        comment: override.comment,
      })),
    )
    .run()
}
