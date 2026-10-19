import { AiReportInsightsPanel } from '@/components/ai'
import type { ReportTabContentProps } from '@/types/reports'
import { ReportMetadata } from './ReportMetadata'
import { ReportSourcesPanel } from './ReportSourcesPanel'
import { ReportTransportSecurityPrimer } from './ReportTransportSecurityPrimer'
import { XmlViewerEmpty } from './XmlViewerEmpty'
import { XmlViewerPanel } from './XmlViewerPanel'

/** The open tab of the report page. */
export function ReportTabContent({
  tab,
  report,
  sources,
  isAiConfigured,
}: Readonly<ReportTabContentProps>) {
  if (tab === 'metadata') return <ReportMetadata report={report} />
  if (tab === 'xml') {
    return report.rawXml ? (
      <XmlViewerPanel rawXml={report.rawXml} />
    ) : (
      <XmlViewerEmpty />
    )
  }
  if (tab === 'transport') {
    return (
      <ReportTransportSecurityPrimer
        domainHints={report.relatedDomains?.map((d) => d.domainName) ?? []}
      />
    )
  }
  return (
    <div className="space-y-4">
      <ReportSourcesPanel sources={sources} />
      <AiReportInsightsPanel
        reportId={report.id}
        isAiConfigured={isAiConfigured}
        hasEvents={sources.length > 0}
      />
    </div>
  )
}
