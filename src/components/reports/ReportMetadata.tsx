import { Info } from 'lucide-react'
import { ReportCollapsible } from './ReportCollapsible'
import { ReportMetadataItem } from './ReportMetadataItem'
import type { ReportMetadataProps } from './ReportMetadataProps'

export function ReportMetadata({ report }: Readonly<ReportMetadataProps>) {
  const ingestedAt = new Date(report.ingestedAt).toLocaleString('en-US')

  return (
    <ReportCollapsible title="Report metadata" icon={<Info />}>
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
        <ReportMetadataItem label="Ingested at">
          {ingestedAt}
        </ReportMetadataItem>
      </dl>
    </ReportCollapsible>
  )
}
