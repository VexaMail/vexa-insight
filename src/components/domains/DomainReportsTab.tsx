import { DispositionChartDisplay } from '@/components/charts'
import { ReportsTable } from '@/components/reports'
import { Panel } from '@/components/ui'
import { FileText, PieChart } from 'lucide-react'
import type { DomainReportsTabProps } from './DomainReportsTabProps'

/** The aggregate reports about the domain, and pass vs fail over them. */
export function DomainReportsTab({
  domainId,
  domainName,
  summary,
}: Readonly<DomainReportsTabProps>) {
  return (
    <div className="space-y-4">
      <Panel
        icon={<FileText />}
        title="Associated reports"
        description="Aggregate reports that include this domain. Open one for its records and the original XML."
      >
        <ReportsTable domainId={domainId} domainName={domainName} />
      </Panel>
      <Panel
        icon={<PieChart />}
        title="Pass vs fail"
        description={`DMARC result of ${summary.totalMessages.toLocaleString('en-US')} messages in all reports.`}
      >
        <DispositionChartDisplay
          passed={summary.passedCount}
          failed={summary.failedCount}
        />
      </Panel>
    </div>
  )
}
