import {
  IpDateRangeAction,
  IpDetailView,
  SndsReputationCard,
} from '@/components/ips'
import { PageContainer } from '@/components/shell'
import { parseDateRangeParams } from '@/lib/utils'
import { getIpDetailExtras } from '@/services/ip-detail'
import { getIpDetailPageData } from '@/services/reports'
import { listSndsLatestByIp } from '@/services/snds'
import { buildIpDateRange } from '@/utils/dates'
import { buildIpDetailContext, parseIpDetailTab } from '@/utils/ips'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { PageProps } from './PageProps'

export const metadata: Metadata = {
  title: 'Sending Source Detail',
  description: 'Authentication health and activity for a single sending source',
}

export const dynamic = 'force-dynamic'

export default async function IpDetailPage(props: PageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  // catch-all gives ip as string[] — join preserves the single IP segment
  const rawIp = params.ip.join('/')
  const ip = decodeURIComponent(rawIp)
  const { days, fromDate, toDate } = parseDateRangeParams(searchParams)
  const dateRange = buildIpDateRange(days, fromDate, toDate)
  const tab = parseIpDetailTab(searchParams['tab'])

  const { data, ...loaded } = await getIpDetailPageData(ip, dateRange)
  if (!data) return notFound()
  const extras = await getIpDetailExtras({
    ip,
    dateRange,
    rawReportIds:
      tab === 'raw' ? (loaded.reports ?? []).map((r) => r.id) : null,
  })

  const basePath = `/ips/${rawIp}`
  const ctx = buildIpDetailContext({
    ip,
    basePath,
    searchParams,
    dateRange,
    data,
    ...loaded,
    ...extras,
  })
  const sndsRows = listSndsLatestByIp().filter((row) => row.ip === ip)

  return (
    <PageContainer>
      <IpDetailView
        ctx={ctx}
        tab={tab}
        actions={
          <IpDateRangeAction
            days={days}
            basePath={basePath}
            from={fromDate}
            to={toDate}
          />
        }
      />
      {sndsRows.length > 0 ? (
        <SndsReputationCard rows={sndsRows} statusRows={[]} />
      ) : null}
    </PageContainer>
  )
}
