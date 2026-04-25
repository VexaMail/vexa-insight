import { insertProcessedMessage } from '@/services/processed-messages'
import type { ImapAccountConfig } from '@/types/config'
import type { AttachmentResult, FetchAttachmentsOptions } from '@/types/imap'
import {
  envelopeDateToIso,
  getDmarcCandidatePartIds,
  handlePostProcessAndReport,
  parseDmarcAttachmentsFromParts,
} from '@/utils/imap'
import type { FetchMessageObject, ImapFlow } from 'imapflow'
import { getBodyStructure } from './getBodyStructure'
import { notifyProcessingRecords } from './notifyProcessingRecords'
import { notifyProgress } from './notifyProgress'

/**
 * Processes a single message UID: fetch, check processed, download parts, parse DMARC attachments.
 * Returns attachments if any; otherwise [] (skipped, already processed, or error).
 */
export async function processOneMessageUid(
  client: ImapFlow,
  account: ImapAccountConfig,
  uid: number,
  folder: string,
  options: FetchAttachmentsOptions,
  providedEnvMsg?: FetchMessageObject,
): Promise<AttachmentResult[]> {
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
    const messageId = envMsg.envelope?.messageId ?? null
    const subject = envMsg.envelope?.subject
    emailDate = envelopeDateToIso(envMsg.envelope?.date)
    const mid = messageId ?? `uid:${uidStr}`

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
    const partsResult = await client.downloadMany(uidStr, partIds, {
      uid: true,
    })
    const validDmarcAttachments = await parseDmarcAttachmentsFromParts(
      partsResult,
      partIds,
      bodyStructure,
    )
    if (validDmarcAttachments.length === 0) return []
    for (const validAtt of validDmarcAttachments) {
      if (validAtt.parsed) {
        validAtt.parsed.rawReport.sourceMessageId = mid
      }
    }
    await notifyProgress(options, {
      accountId: account.id,
      emailDate,
      subject,
      uid: uidStr,
      step: 'dmarc_detected',
    })
    await notifyProcessingRecords(
      options,
      account,
      emailDate,
      subject,
      uidStr,
      validDmarcAttachments.length,
    )
    await insertProcessedMessage(account.id, mid, options.jobRunId)
    await handlePostProcessAndReport({
      accountId: account.id,
      client,
      context: 'processed',
      emailDate,
      markAsReadAfterProcess: options.markAsReadAfterProcess,
      moveToTrashAfterProcess: options.moveToTrashAfterProcess,
      onProgress: options.onEmailProgress,
      postProcessAction: options.postProcessAction,
      postProcessFolder: options.postProcessFolder ?? null,
      sourceFolder: folder,
      subject,
      uidStr,
    })
    await notifyProgress(options, {
      accountId: account.id,
      emailDate,
      subject,
      uid: uidStr,
      step: 'done',
    })
    return validDmarcAttachments
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    if (options.onEmailProgress) {
      await options.onEmailProgress({
        accountId: account.id,
        emailDate,
        uid: uidStr,
        step: 'error',
        error: message,
      })
    }
    return []
  }
}
