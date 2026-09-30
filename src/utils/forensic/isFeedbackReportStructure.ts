import { isWalkableBodyPart } from '@/utils/imap'

/**
 * Whether a message's MIME structure is an ARF report:
 * `multipart/report; report-type=feedback-report` (RFC 5965). Delivery
 * status notifications share `multipart/report` but not the report type.
 */
export function isFeedbackReportStructure(bodyStructure: unknown): boolean {
  if (!isWalkableBodyPart(bodyStructure)) return false
  if (bodyStructure.type.toLowerCase() !== 'multipart/report') return false
  const reportType = bodyStructure.parameters?.['report-type']
  return reportType?.toLowerCase() === 'feedback-report'
}
