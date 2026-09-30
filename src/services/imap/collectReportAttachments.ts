import type { AttachmentResult, CollectForensicReportInput } from '@/types/imap'
import { isFeedbackReportStructure } from '@/utils/forensic'
import { getDmarcCandidatePartIds } from '@/utils/imap'
import { collectForensicReport } from './collectForensicReport'
import { collectMessageAttachments } from './collectMessageAttachments'
import { notifyProgress } from './notifyProgress'

/**
 * Collects the reports in one message: the ARF parts when its structure is a
 * failure report, else the candidate attachments (aggregate or TLS reports).
 */
export async function collectReportAttachments(
  input: CollectForensicReportInput,
): Promise<AttachmentResult[]> {
  const { account, bodyStructure, options, summary, uidStr } = input
  const isFailureReport = isFeedbackReportStructure(bodyStructure)
  const partIds = isFailureReport ? [] : getDmarcCandidatePartIds(bodyStructure)
  if (!isFailureReport && partIds.length === 0) return []

  await notifyProgress(options, {
    accountId: account.id,
    emailDate: summary.emailDate,
    subject: summary.subject,
    uid: uidStr,
    step: 'downloading',
  })

  if (isFailureReport) return collectForensicReport(input)
  return collectMessageAttachments({ ...input, partIds })
}
