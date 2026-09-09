import type { DmarcReportMetadata } from '@/types/dmarc'

import { readReportDateRange } from './readReportDateRange'
import { str } from './str'

export function readReportMetadata(
  feedback: Record<string, unknown>,
): DmarcReportMetadata {
  const metadata = feedback['report_metadata'] as
    Record<string, unknown> | undefined
  return {
    reportId: str(metadata?.['report_id'] ?? ''),
    orgName: str(metadata?.['org_name'] ?? ''),
    email: str(metadata?.['email'] ?? ''),
    ...readReportDateRange(metadata),
  }
}
