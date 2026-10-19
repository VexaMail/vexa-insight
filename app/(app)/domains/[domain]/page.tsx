import type { Metadata } from 'next'

import { DomainDetail, DomainDetailHeader } from '@/components/domains'
import { PageContainer } from '@/components/shell'
import { Navigator, PageSkeleton } from '@/components/ui'
import { getDomainByName } from '@/services/reports'
import {
  domainTabHref,
  parseDomainDetailTab,
  parseSourceDays,
} from '@/utils/domains'
import { Activity } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { DnsTabLoader } from './DnsTabLoader'
import type { DomainDetailPageProps } from './DomainDetailPageProps'
import { getDomainDetail } from './getDomainDetail'

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
      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          href={`/diagnostics/${encodeURIComponent(domainName)}`}
          className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
        >
          <Activity className="h-4 w-4" aria-hidden="true" />
          Diagnostics
        </Link>
        <Navigator currentId={domainName} basePath="/domains" />
      </div>
      <DomainDetailHeader
        domainName={domainName}
        policy={data.policy}
        totalMessages={data.summary.totalMessages}
        reportsHref={domainTabHref(domainName, 'reports')}
      />
      <DomainDetail
        domainId={domainRow.id}
        domainName={domainName}
        data={data}
        tab={tab}
        dnsSlot={
          <Suspense fallback={<PageSkeleton className="h-[320px]" />}>
            <DnsTabLoader domainName={domainName} />
          </Suspense>
        }
      />
    </PageContainer>
  )
}
