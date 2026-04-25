import { ingestOneAttachment } from '@/services/reports'
import type { ImapAccountConfig } from '@/types/config'
import type { FetchAndIngestHooks, FetchAndIngestResult } from '@/types/imap'
import { buildFetchAttachmentsOptionsFromHooks } from '@/utils/imap'
import { fetchAttachments } from './fetchAttachments'

/**
 * Fetches DMARC attachments from IMAP (last N days), parses and ingests each.
 * Skips already processed by Message-ID. Optional onEmailProgress for progress UI.
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
  for await (const att of fetchAttachments(days, account, options)) {
    if (hooks.getAbortRequested && (await hooks.getAbortRequested())) break
    result.processed += 1
    if (hooks.onProgress) {
      await hooks.onProgress(result.processed)
    }
    const r = await ingestOneAttachment(att)
    if (r.error) {
      result.errors.push(r.error)
    } else if (r.ingested) {
      result.ingested += 1
    } else {
      result.skipped += 1
    }
  }
  return result
}
