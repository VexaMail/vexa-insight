import { DispositionChartDisplay } from '@/components/charts'
import { ReportsTable } from '@/components/reports'
import type { DomainDetailProps } from './DomainDetailProps'
import DomainSourcesTable from './DomainSourcesTable'
import DomainStatsCard from './DomainStatsCard'

export default function DomainDetail({
  domainId,
  domainName,
  data,
}: Readonly<DomainDetailProps>) {
  const { stats, sources } = data

  return (
    <>
      <DomainStatsCard
        totalMessages={stats.totalMessages}
        passedCount={stats.passedCount}
        failedCount={stats.failedCount}
        passRatePercent={stats.passRatePercent}
      />
      <section aria-labelledby="disposition-heading">
        <h2
          id="disposition-heading"
          className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50"
        >
          Pass vs fail
        </h2>
        <DispositionChartDisplay
          passed={stats.passedCount}
          failed={stats.failedCount}
        />
      </section>
      <section aria-labelledby="sources-heading">
        <h2
          id="sources-heading"
          className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50"
        >
          Sources (IP, count)
        </h2>
        <DomainSourcesTable sources={sources} />
      </section>
      <section aria-labelledby="reports-heading">
        <h2
          id="reports-heading"
          className="mb-3 text-lg font-medium text-zinc-900 dark:text-zinc-50"
        >
          Associated Reports
        </h2>
        <ReportsTable domainId={domainId} domainName={domainName} />
      </section>
    </>
  )
}
