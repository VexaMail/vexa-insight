import type { ReportTabKey } from '@/types/reports'
import type { TabNavItem } from '@/types/ui'
import { FileCode2, Info, LockKeyhole, Network } from 'lucide-react'

/**
 * The report page tabs; each keeps the domain the report was opened from, so
 * the report navigator stays scoped to it.
 */
export function buildReportTabs(
  reportId: number,
  sourceCount: number,
  fromDomain: string | undefined,
): TabNavItem[] {
  const href = (tab: ReportTabKey) => {
    const params = new URLSearchParams()
    if (tab !== 'sources') params.set('tab', tab)
    if (fromDomain) params.set('fromDomain', fromDomain)
    const query = params.toString()
    return `/reports/${String(reportId)}${query ? `?${query}` : ''}`
  }
  return [
    {
      key: 'sources',
      label: 'Sending sources',
      href: href('sources'),
      icon: Network,
      count: sourceCount,
    },
    { key: 'metadata', label: 'Metadata', href: href('metadata'), icon: Info },
    { key: 'xml', label: 'Raw XML', href: href('xml'), icon: FileCode2 },
    {
      key: 'transport',
      label: 'Transport security',
      href: href('transport'),
      icon: LockKeyhole,
    },
  ]
}
