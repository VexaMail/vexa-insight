import type {
  AttachmentResult,
  CollectMessageAttachmentsInput,
} from '@/types/imap'
import { tagAttachmentSourceMessageId } from '@/utils/imap'
import { downloadDmarcAttachments } from './downloadDmarcAttachments'
import { finalizeProcessedMessage } from './finalizeProcessedMessage'

/** Downloads the candidate parts and, when reports came out, finalizes the message. */
export async function collectMessageAttachments({
  account,
  client,
  folder,
  options,
  uidStr,
  partIds,
  bodyStructure,
  summary,
}: CollectMessageAttachmentsInput): Promise<AttachmentResult[]> {
  const attachments = await downloadDmarcAttachments(
    client,
    uidStr,
    partIds,
    bodyStructure,
  )
  if (attachments.length === 0) return []

  tagAttachmentSourceMessageId(attachments, summary.messageId)
  await finalizeProcessedMessage({
    account,
    attachmentCount: attachments.length,
    client,
    emailDate: summary.emailDate,
    folder,
    messageId: summary.messageId,
    options,
    subject: summary.subject,
    uidStr,
  })

  return attachments
}
