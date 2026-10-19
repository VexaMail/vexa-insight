import type { ReportEvidenceSectionsProps } from '@/types/reports'
import { ReportMetadata } from './ReportMetadata'
import { ReportTransportSecurityPrimer } from './ReportTransportSecurityPrimer'
import { XmlViewerCollapsible } from './XmlViewerCollapsible'

/** The report's own evidence, closed by default: metadata, raw XML, primer. */
export function ReportEvidenceSections({
  report,
}: Readonly<ReportEvidenceSectionsProps>) {
  return (
    <div className="space-y-3">
      <ReportMetadata report={report} />
      <XmlViewerCollapsible rawXml={report.rawXml} />
      <ReportTransportSecurityPrimer
        domainHints={report.relatedDomains?.map((d) => d.domainName) ?? []}
      />
    </div>
  )
}
