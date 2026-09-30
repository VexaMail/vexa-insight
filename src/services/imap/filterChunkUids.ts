import type { FilterChunkUidsInput } from '@/types/imap'
import { isFeedbackReportStructure } from '@/utils/forensic'
import { isDmarcCandidate } from '@/utils/imap'
import { handleAlreadyProcessed } from './handleAlreadyProcessed'

/**
 * UIDs of the chunk that are report candidates and not yet processed: an
 * aggregate or TLS report by subject, or a failure report by MIME structure,
 * since failure reports often keep the reported message's subject.
 */
export async function filterChunkUids({
  client,
  account,
  folder,
  chunk,
  uidToMidMap,
  processedIdsSet,
  options,
}: FilterChunkUidsInput): Promise<number[]> {
  const uids: number[] = []

  for (const uid of chunk) {
    const info = uidToMidMap.get(uid)
    if (!info) continue
    if (
      !isDmarcCandidate(info.subject) &&
      !isFeedbackReportStructure(info.env?.bodyStructure)
    )
      continue

    if (processedIdsSet.has(info.mid)) {
      await handleAlreadyProcessed({
        client,
        account,
        folder,
        uid,
        info,
        options,
      })
    } else {
      uids.push(uid)
    }
  }

  return uids
}
