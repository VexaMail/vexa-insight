import type { FilterChunkUidsInput } from '@/types/imap'
import { isDmarcCandidate } from '@/utils/imap'
import { handleAlreadyProcessed } from './handleAlreadyProcessed'

/** UIDs of the chunk that are DMARC candidates and not yet processed. */
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
    if (!isDmarcCandidate(info.subject)) continue

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
