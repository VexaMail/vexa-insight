import type {
  AttachmentResult,
  CollectedMessage,
  CollectForensicReportInput,
} from '@/types/imap'

/** Pairs a message's downloaded reports with the bookkeeping deferred to after ingest. */
export function buildCollectedMessage(
  input: CollectForensicReportInput,
  attachments: AttachmentResult[],
): CollectedMessage {
  const { account, client, folder, options, summary, uidStr } = input
  return {
    attachments,
    finalize: {
      account,
      attachmentCount: attachments.length,
      client,
      emailDate: summary.emailDate,
      folder,
      messageId: summary.messageId,
      options,
      subject: summary.subject,
      uidStr,
    },
  }
}
