import type { ReportTabKey } from '@/types/reports'

/** The `?tab=` of the report page, or the sources tab when absent or unknown. */
export function parseReportTab(value: unknown): ReportTabKey {
  if (value === 'metadata' || value === 'xml' || value === 'transport') {
    return value
  }
  return 'sources'
}
