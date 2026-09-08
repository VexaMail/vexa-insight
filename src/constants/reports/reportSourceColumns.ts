import type { ReportSourceColumn } from '@/types/reports'

/** Header cells of the sending-sources table, in render order. */
export const REPORT_SOURCE_COLUMNS: ReportSourceColumn[] = [
  { label: 'Severity', align: 'left', srOnly: true },
  { label: 'Source IP', align: 'left', srOnly: false },
  { label: 'Hostname', align: 'left', srOnly: false },
  { label: 'Messages', align: 'right', srOnly: false },
  { label: 'SPF', align: 'center', srOnly: false },
  { label: 'DKIM', align: 'center', srOnly: false },
  { label: 'Alignment', align: 'center', srOnly: false },
  { label: 'Disposition', align: 'left', srOnly: false },
]
