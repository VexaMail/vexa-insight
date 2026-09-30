import type { AttachmentResult, ProcessOneMessageUidInput } from '@/types/imap'
import { summarizeEnvelope } from '@/utils/imap'
import { collectReportAttachments } from './collectReportAttachments'
import { fetchEnvelopeMessage } from './fetchEnvelopeMessage'
import { getBodyStructure } from './getBodyStructure'
import { reportMessageError } from './reportMessageError'

/**
 * Processes a single message UID: fetch, check processed, download parts, parse
 * report attachments (or the ARF parts of a failure report).
 * Returns attachments if any; otherwise [] (skipped, already processed, or error).
 */
export async function processOneMessageUid(
  input: ProcessOneMessageUidInput,
): Promise<AttachmentResult[]> {
  const { account, client, folder, options, providedEnvMsg, uid } = input
  const uidStr = String(uid)
  let emailDate: string | undefined

  try {
    const envMsg = await fetchEnvelopeMessage(client, uidStr, providedEnvMsg)
    if (!envMsg) return []

    const summary = summarizeEnvelope(envMsg, uidStr)
    emailDate = summary.emailDate

    const bodyStructure = await getBodyStructure(client, uidStr, envMsg)
    if (!bodyStructure) return []

    return await collectReportAttachments({
      account,
      client,
      folder,
      options,
      uidStr,
      bodyStructure,
      summary,
    })
  } catch (error: unknown) {
    await reportMessageError({
      accountId: account.id,
      emailDate,
      error,
      options,
      uidStr,
    })
    return []
  }
}
