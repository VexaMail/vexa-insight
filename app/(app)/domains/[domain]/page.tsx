import type { Metadata } from 'next'

import { DomainDetail, DomainDetailHeader } from '@/components/domains'
import { PageContainer } from '@/components/shell'
import { PageSkeleton } from '@/components/ui'
import { getDomainByName } from '@/services/reports'
import { parseDomainDetailTab, parseSourceDays } from '@/utils/domains'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { CoveragePanelLoader } from './CoveragePanelLoader'
import { DnsTabLoader } from './DnsTabLoader'
import type { DomainDetailPageProps } from './DomainDetailPageProps'
import { getDomainDetail } from './getDomainDetail'
import { HistoryTabLoader } from './HistoryTabLoader'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: Pick<DomainDetailPageProps, 'params'>): Promise<Metadata> {
  return { title: `Domain ${(await params).domain}` }
}

export default async function DomainDetailPage({
  params,
  searchParams,
}: DomainDetailPageProps) {
  const { domain: domainName } = await params
  const query = await searchParams
  const tab = parseDomainDetailTab(query['tab'])
  const sourceDays = parseSourceDays(query['days'])

  const domainRow = await getDomainByName(domainName)
  if (!domainRow) notFound()

  const data = await getDomainDetail(domainRow.id, domainName, sourceDays)
  if (data == null) notFound()

  return (
    <PageContainer>
      <DomainDetailHeader
        domainId={domainRow.id}
        domainName={domainName}
        policy={data.policy}
        summary={data.summary}
      />
      <DomainDetail
        domainId={domainRow.id}
        domainName={domainName}
        data={data}
        tab={tab}
        dnsSlot={
          <Suspense fallback={<PageSkeleton className="h-[320px]" />}>
            <DnsTabLoader domainName={domainName} domainId={domainRow.id} />
          </Suspense>
        }
        coverageSlot={
          <Suspense fallback={<PageSkeleton className="h-[200px]" />}>
            <CoveragePanelLoader domainName={domainName} />
          </Suspense>
        }
        historySlot={
          <Suspense fallback={<PageSkeleton className="h-[320px]" />}>
            <HistoryTabLoader domainName={domainName} />
          </Suspense>
        }
      />
    </PageContainer>
  )
}
