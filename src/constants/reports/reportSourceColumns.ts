import type { ReportSourceColumn } from '@/types/reports'

/** Header cells of the sending-sources table, in render order. */
export const REPORT_SOURCE_COLUMNS: ReportSourceColumn[] = [
  { label: 'Source IP', align: 'left', srOnly: false },
  { label: 'Hostname', align: 'left', srOnly: false },
  { label: 'Messages', align: 'right', srOnly: false },
  { label: 'SPF auth / aligned', align: 'left', srOnly: false },
  { label: 'DKIM auth / aligned', align: 'left', srOnly: false },
  { label: 'DMARC / disposition', align: 'left', srOnly: false },
]
