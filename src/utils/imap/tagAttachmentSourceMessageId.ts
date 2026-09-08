import type { AttachmentResult } from '@/types/imap'

/** Stamps the originating message id onto every parsed report. */
export function tagAttachmentSourceMessageId(
  attachments: readonly AttachmentResult[],
  messageId: string,
): void {
  for (const attachment of attachments) {
    if (attachment.parsed) {
      attachment.parsed.rawReport.sourceMessageId = messageId
    }
  }
}
