import type { AttachmentResult, ProcessOneMessageUidInput } from '@/types/imap'
import { getDmarcCandidatePartIds, summarizeEnvelope } from '@/utils/imap'
import { collectMessageAttachments } from './collectMessageAttachments'
import { fetchEnvelopeMessage } from './fetchEnvelopeMessage'
import { getBodyStructure } from './getBodyStructure'
import { notifyProgress } from './notifyProgress'
import { reportMessageError } from './reportMessageError'

/**
 * Processes a single message UID: fetch, check processed, download parts, parse DMARC attachments.
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

    const partIds = getDmarcCandidatePartIds(bodyStructure)
    if (partIds.length === 0) return []

    await notifyProgress(options, {
      accountId: account.id,
      emailDate,
      subject: summary.subject,
      uid: uidStr,
      step: 'downloading',
    })

    return await collectMessageAttachments({
      account,
      client,
      folder,
      options,
      uidStr,
      partIds,
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
