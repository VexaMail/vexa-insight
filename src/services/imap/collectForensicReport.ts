import type {
  AttachmentResult,
  CollectedMessage,
  CollectForensicReportInput,
} from '@/types/imap'
import { findArfPartIds, parseArfParts } from '@/utils/forensic'
import {
  buildCollectedMessage,
  tagAttachmentSourceMessageId,
} from '@/utils/imap'

/**
 * Downloads the ARF parts of a failure report message. Like an aggregate
 * report mail, it is finalized only after the report has ingested.
 */
export async function collectForensicReport(
  input: CollectForensicReportInput,
): Promise<CollectedMessage | null> {
  const { client, uidStr, bodyStructure, summary } = input
  const ids = findArfPartIds(bodyStructure)
  if (ids === null) return null
  const partIds = [ids.feedbackPartId, ids.headersPartId].filter(
    (id): id is string => id !== null,
  )
  const parts = await client.downloadMany(uidStr, partIds, { uid: true })
  const forensicReport = parseArfParts(parts, ids)
  if (forensicReport === null) return null

  const attachments: AttachmentResult[] = [
    { buffer: Buffer.alloc(0), filename: 'feedback-report', forensicReport },
  ]
  tagAttachmentSourceMessageId(attachments, summary.messageId)
  return buildCollectedMessage(input, attachments)
}
