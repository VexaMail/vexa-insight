import type { AttachmentResult, ProcessOneMessageUidInput } from '@/types/imap'
import {
  envelopeDateToIso,
  getDmarcCandidatePartIds,
  tagAttachmentSourceMessageId,
} from '@/utils/imap'
import { downloadDmarcAttachments } from './downloadDmarcAttachments'
import { finalizeProcessedMessage } from './finalizeProcessedMessage'
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
    const envMsg =
      providedEnvMsg ??
      (await client.fetchOne(
        uidStr,
        { envelope: true, bodyStructure: true, uid: true },
        { uid: true },
      ))
    if (!envMsg) return []

    const subject = envMsg.envelope?.subject
    emailDate = envelopeDateToIso(envMsg.envelope?.date)
    const messageId = envMsg.envelope?.messageId ?? `uid:${uidStr}`

    const bodyStructure = await getBodyStructure(client, uidStr, envMsg)
    if (!bodyStructure) return []

    const partIds = getDmarcCandidatePartIds(bodyStructure)
    if (partIds.length === 0) return []

    await notifyProgress(options, {
      accountId: account.id,
      emailDate,
      subject,
      uid: uidStr,
      step: 'downloading',
    })

    const attachments = await downloadDmarcAttachments(
      client,
      uidStr,
      partIds,
      bodyStructure,
    )
    if (attachments.length === 0) return []

    tagAttachmentSourceMessageId(attachments, messageId)
    await finalizeProcessedMessage({
      account,
      attachmentCount: attachments.length,
      client,
      emailDate,
      folder,
      messageId,
      options,
      subject,
      uidStr,
    })

    return attachments
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
