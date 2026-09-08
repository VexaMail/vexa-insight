import type { ImapAccountConfig } from '@/types/config'
import type { FetchAttachmentsOptions } from '@/types/imap'
import type { ImapFlow } from 'imapflow'
import { processOneMessageUid } from './processOneMessageUid'
import type { UidInfo } from './UidInfo'

export async function* processUnprocessedUids(
  client: ImapFlow,
  account: ImapAccountConfig,
  folder: string,
  uidsToProcessFull: number[],
  uidToMidMap: Map<number, UidInfo>,
  options: FetchAttachmentsOptions,
) {
  const results = await Promise.all(
    uidsToProcessFull.map(async (uid) =>
      processOneMessageUid(
        client,
        account,
        uid,
        folder,
        options,
        uidToMidMap.get(uid)?.env,
      ),
    ),
  )

  for (const attachments of results) {
    for (const att of attachments) yield att
  }
}
