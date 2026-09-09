import { normalizedEventPolicyOverrides } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import type { ReportTransaction } from '@/types/reports'
import { eq } from 'drizzle-orm'
import { insertEventPolicyOverrides } from './insertEventPolicyOverrides'

/** Rewrites an event's policy override rows so a re-run does not duplicate them. */
export function replaceEventPolicyOverrides(
  tx: ReportTransaction,
  eventId: number,
  policyOverrides: ParseResult['events'][number]['policyOverrides'],
): void {
  if (policyOverrides.length === 0) return
  tx.delete(normalizedEventPolicyOverrides)
    .where(eq(normalizedEventPolicyOverrides.eventId, eventId))
    .run()
  insertEventPolicyOverrides(tx, eventId, policyOverrides)
}
