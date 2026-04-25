import type { ImapAccountConfig } from '@/types/config'
import type { FetchAttachmentsOptions } from '@/types/imap'
import { isDmarcCandidate } from '@/utils/imap'
import type { ImapFlow } from 'imapflow'
import type { UidInfo } from './UidInfo'
import { handleAlreadyProcessed } from './handleAlreadyProcessed'

export async function filterChunkUids(
  client: ImapFlow,
  account: ImapAccountConfig,
  folder: string,
  chunk: number[],
  uidToMidMap: Map<number, UidInfo>,
  processedIdsSet: Set<string>,
  options: FetchAttachmentsOptions,
): Promise<number[]> {
  const uidsToProcessFull: number[] = []

  for (const uid of chunk) {
    const info = uidToMidMap.get(uid)
    if (!info) continue

    if (!isDmarcCandidate(info.subject)) continue

    if (processedIdsSet.has(info.mid)) {
      await handleAlreadyProcessed(client, account, folder, uid, info, options)
    } else {
      uidsToProcessFull.push(uid)
    }
  }

  return uidsToProcessFull
}
