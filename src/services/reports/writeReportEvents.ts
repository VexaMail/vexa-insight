import { normalizedEvents } from '@/lib/db'
import type { WriteReportEventsInput } from '@/types/reports'
import { insertEventDkimResults } from './insertEventDkimResults'
import { insertEventPolicyOverrides } from './insertEventPolicyOverrides'

/** Inserts every normalized event of one report, with its child rows. */
export function writeReportEvents({
  tx,
  events,
  ipAddressIds,
  rawReportId,
  domainId,
  now,
}: WriteReportEventsInput): void {
  for (const [i, ev] of events.entries()) {
    const ipAddressId = ipAddressIds[i]
    if (ipAddressId == null)
      throw new Error(`Missing ipAddressId for index ${String(i)}`)

    const insertedEvent = tx
      .insert(normalizedEvents)
      .values({
        rawReportId,
        domainId,
        ipAddressId,
        spfResult: ev.spfResult,
        dkimResult: ev.dkimResult,
        spfAuthResult: ev.spfAuthResult,
        spfAligned: ev.spfAligned,
        dkimAligned: ev.dkimAligned,
        disposition: ev.disposition,
        count: ev.count,
        reportBeginDate: ev.reportBeginDate,
        reportEndDate: ev.reportEndDate,
        createdAt: now,
      })
      .returning({ id: normalizedEvents.id })
      .get()

    const eventId = insertedEvent.id
    if (!eventId) continue

    insertEventDkimResults(tx, eventId, ev.dkimAuthResults)
    insertEventPolicyOverrides(tx, eventId, ev.policyOverrides)
  }
}
