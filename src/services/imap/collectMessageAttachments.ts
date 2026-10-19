import type {
  CollectedMessage,
  CollectMessageAttachmentsInput,
} from '@/types/imap'
import {
  buildCollectedMessage,
  tagAttachmentSourceMessageId,
} from '@/utils/imap'
import { downloadDmarcAttachments } from './downloadDmarcAttachments'

/**
 * Downloads the candidate parts. The message is not finalized here: that
 * waits until its reports have ingested.
 */
export async function collectMessageAttachments(
  input: CollectMessageAttachmentsInput,
): Promise<CollectedMessage | null> {
  const { client, uidStr, partIds, bodyStructure, summary } = input
  const attachments = await downloadDmarcAttachments(
    client,
    uidStr,
    partIds,
    bodyStructure,
  )
  if (attachments.length === 0) return null

  tagAttachmentSourceMessageId(attachments, summary.messageId)
  return buildCollectedMessage(input, attachments)
}
