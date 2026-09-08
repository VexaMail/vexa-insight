import { normalizedEventDkimResults } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import type { ReportTransaction } from '@/types/reports'

export function insertEventDkimResults(
  tx: ReportTransaction,
  eventId: number,
  dkimAuthResults: ParseResult['events'][number]['dkimAuthResults'],
): void {
  if (dkimAuthResults.length === 0) return

  tx.insert(normalizedEventDkimResults)
    .values(
      dkimAuthResults.map((dkim) => ({
        eventId,
        domain: dkim.domain,
        selector: dkim.selector,
        result: dkim.result,
        isAligned: dkim.isAligned,
      })),
    )
    .run()
}
