import type { AttachmentResult, CollectForensicReportInput } from '@/types/imap'
import { findArfPartIds, parseArfParts } from '@/utils/forensic'
import { tagAttachmentSourceMessageId } from '@/utils/imap'
import { finalizeProcessedMessage } from './finalizeProcessedMessage'

/**
 * Downloads the ARF parts of a failure report message and, when they parse,
 * finalizes the message like an aggregate report mail.
 */
export async function collectForensicReport({
  account,
  client,
  folder,
  options,
  uidStr,
  bodyStructure,
  summary,
}: CollectForensicReportInput): Promise<AttachmentResult[]> {
  const ids = findArfPartIds(bodyStructure)
  if (ids === null) return []
  const partIds = [ids.feedbackPartId, ids.headersPartId].filter(
    (id): id is string => id !== null,
  )
  const parts = await client.downloadMany(uidStr, partIds, { uid: true })
  const forensicReport = parseArfParts(parts, ids)
  if (forensicReport === null) return []

  const attachments: AttachmentResult[] = [
    { buffer: Buffer.alloc(0), filename: 'feedback-report', forensicReport },
  ]
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
