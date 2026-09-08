import type {
  AttachmentResult,
  ProcessUnprocessedUidsInput,
} from '@/types/imap'
import { processOneMessageUid } from './processOneMessageUid'

/** Fetch every unprocessed UID of a chunk in parallel, yielding attachments. */
export async function* processUnprocessedUids({
  client,
  account,
  folder,
  uids,
  uidToMidMap,
  options,
}: ProcessUnprocessedUidsInput): AsyncGenerator<AttachmentResult> {
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

  for (const attachments of results) {
    for (const attachment of attachments) yield attachment
  }
}
