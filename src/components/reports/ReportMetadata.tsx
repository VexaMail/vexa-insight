import { Panel } from '@/components/ui'
import { formatRunAt } from '@/utils/format'
import { Info } from 'lucide-react'
import { ReportMetadataItem } from './ReportMetadataItem'
import type { ReportMetadataProps } from './ReportMetadataProps'

/** Who sent the report, from where, and when it was stored. */
export function ReportMetadata({ report }: Readonly<ReportMetadataProps>) {
  return (
    <Panel
      icon={<Info />}
      title="Report metadata"
      description="The report's own identifiers, and when it was stored here."
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <ReportMetadataItem label="Report ID" mono>
          {report.reportId}
        </ReportMetadataItem>
        <ReportMetadataItem label="Reporting organization">
          {report.orgName}
        </ReportMetadataItem>
        <ReportMetadataItem label="Source email" mono>
          {report.sourceEmail ?? 'Not recorded'}
        </ReportMetadataItem>
        <ReportMetadataItem label="Ingested at" mono>
          {formatRunAt(new Date(report.ingestedAt))}
        </ReportMetadataItem>
      </dl>
    </Panel>
  )
}
