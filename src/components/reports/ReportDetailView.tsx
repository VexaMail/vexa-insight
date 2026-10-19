import { Navigator, TabNav } from '@/components/ui'
import type { ReportDetailViewProps } from '@/types/reports'
import {
  buildReportKpiTrends,
  buildReportTabs,
  countDistinctSourceIps,
} from '@/utils/reports'
import { AuthenticationSummary } from './AuthenticationSummary'
import { ReportEntityHeader } from './ReportEntityHeader'
import { ReportFactsStrip } from './ReportFactsStrip'
import { ReportKpiTiles } from './ReportKpiTiles'
import { ReportTabContent } from './ReportTabContent'

/**
 * One aggregate report: identity, the four figures with the receiver's
 * history behind them, the facts strip, then the tabbed evidence.
 */
export function ReportDetailView({
  data,
  tab,
  fromDomain,
  isAiConfigured,
}: Readonly<ReportDetailViewProps>) {
  const { report, stats, sources, history } = data
  const sourceCount = countDistinctSourceIps(sources)
  return (
    <>
      <ReportEntityHeader
        report={report}
        stats={stats}
        navigatorSlot={
          <Navigator currentId={String(report.id)} basePath="/reports" />
        }
      />
      <ReportKpiTiles stats={stats} trends={buildReportKpiTrends(history)} />
      <ReportFactsStrip
        report={report}
        stats={stats}
        sourceCount={sourceCount}
        sources={sources}
      />
      <AuthenticationSummary stats={stats} sources={sources} />
      <div className="space-y-4">
        <TabNav
          label="Report sections"
          active={tab}
          items={buildReportTabs(report.id, sourceCount, fromDomain)}
        />
        <ReportTabContent
          tab={tab}
          report={report}
          sources={sources}
          isAiConfigured={isAiConfigured}
        />
      </div>
    </>
  )
}
