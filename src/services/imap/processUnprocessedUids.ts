import type {
  CollectedMessage,
  ProcessUnprocessedUidsInput,
} from '@/types/imap'
import { processOneMessageUid } from './processOneMessageUid'

/** Fetch every unprocessed UID of a chunk in parallel, yielding each report message. */
export async function* processUnprocessedUids({
  client,
  account,
  folder,
  uids,
  uidToMidMap,
  options,
}: ProcessUnprocessedUidsInput): AsyncGenerator<CollectedMessage> {
  const results = await Promise.all(
    uids.map(async (uid) =>
      processOneMessageUid({
        client,
        account,
        uid,
        folder,
        options,
        providedEnvMsg: uidToMidMap.get(uid)?.env,
      }),
    ),
  )

  for (const message of results) {
    if (message !== null) yield message
  }
}
