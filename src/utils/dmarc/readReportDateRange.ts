import type { DmarcReportDateRange } from '@/types/dmarc'

import { num } from './num'

export function readReportDateRange(
  metadata: Record<string, unknown> | undefined,
): DmarcReportDateRange {
  const dateRange = metadata?.['date_range'] as
    Record<string, unknown> | undefined
  return {
    beginTs: num(dateRange?.['begin'] ?? 0),
    endTs: num(dateRange?.['end'] ?? 0),
  }
}
