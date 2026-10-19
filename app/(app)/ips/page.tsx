import { DateRangeFilter } from '@/components/filters'
import {
  IpsSummaryKpis,
  IpsTable,
  SndsReputationPanel,
  SourceCauseChips,
} from '@/components/ips'
import { PageContainer, PageHeader } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { parseDateRangeParams } from '@/lib/utils'
import { getIpSources } from '@/services/reports'
import { getSndsReputationPanel } from '@/services/snds'
import { buildIpDateRange } from '@/utils/dates'
import {
  buildSourceCauseHrefs,
  computeIpsKpis,
  countSourceCauses,
  filterSourcesByCause,
  parseSourceCause,
} from '@/utils/ips'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import type { PageProps } from './PageProps'

export const metadata: Metadata = {
  title: 'Sending Sources',
  description:
    'IP addresses sending email on behalf of your domains, based on DMARC aggregate reports',
}

export const dynamic = 'force-dynamic'

export default async function IpsPage(props: PageProps) {
  const searchParams = await props.searchParams
  const { days, fromDate, toDate } = parseDateRangeParams(searchParams)
  const sources = await getIpSources(buildIpDateRange(days, fromDate, toDate))
  const cause = parseSourceCause(searchParams['cause'])
  const hrefs = buildSourceCauseHrefs(searchParams)

  return (
    <PageContainer>
      <PageHeader
        title="Sending sources"
        description="Every IP that sent mail as your domains, from DMARC aggregate reports, grouped by why it passes or fails DMARC."
        period={
          <Suspense
            fallback={
              <div className="bg-secondary h-9 w-[160px] animate-pulse rounded-md" />
            }
          >
            <DateRangeFilter
              currentDays={days}
              basePath="/ips"
              from={fromDate}
              to={toDate}
            />
          </Suspense>
        }
      />
      <IpsSummaryKpis
        kpis={computeIpsKpis(sources)}
        failingHref={hrefs.failing}
      />
      <SourceCauseChips
        counts={countSourceCauses(sources)}
        total={sources.length}
        active={cause}
        hrefs={hrefs}
      />
      <Suspense fallback={<PageSkeleton />}>
        <IpsTable ips={filterSourcesByCause(sources, cause)} />
      </Suspense>
      <SndsReputationPanel panel={getSndsReputationPanel()} />
    </PageContainer>
  )
}
