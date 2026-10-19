import type { ImapAccountConfig } from '@/types/config'
import type { FetchAndIngestHooks, FetchAndIngestResult } from '@/types/imap'
import { buildFetchAttachmentsOptionsFromHooks } from '@/utils/imap'
import { fetchAttachments } from './fetchAttachments'
import { ingestCollectedMessage } from './ingestCollectedMessage'

/**
 * Fetches DMARC report messages from IMAP (last N days) and ingests each one
 * while its folder is still open, recording and post-processing a message
 * only after its reports ingested. A message whose ingest failed stays
 * unrecorded in its mailbox, so the next poll retries it; each such failure
 * is one entry of `errors`.
 */
export async function runFetchAndIngest(
  days: number,
  account: ImapAccountConfig,
  hooks: FetchAndIngestHooks,
): Promise<FetchAndIngestResult> {
  const result: FetchAndIngestResult = {
    errors: [],
    ingested: 0,
    processed: 0,
    skipped: 0,
  }
  const options = buildFetchAttachmentsOptionsFromHooks(hooks)
  for await (const message of fetchAttachments(days, account, options)) {
    if (hooks.getAbortRequested && (await hooks.getAbortRequested())) break
    result.processed += message.attachments.length
    if (hooks.onProgress) {
      await hooks.onProgress(result.processed)
    }
    const outcome = await ingestCollectedMessage(message)
    result.ingested += outcome.ingested
    result.skipped += outcome.skipped
    result.errors.push(...outcome.errors)
  }
  return result
}
