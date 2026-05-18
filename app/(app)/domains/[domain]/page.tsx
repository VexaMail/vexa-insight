import type { Metadata } from 'next'

import { DomainDetail } from '@/components/domains'
import { BackButton, PageContainer, PageHeader } from '@/components/shell'
import { Navigator, PageSkeleton } from '@/components/ui'
import { getDomainByName } from '@/services/reports'
import { Activity } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getDomainDetail } from './getDomainDetail'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ domain: string }>
}): Promise<Metadata> {
  return { title: `Domain ${(await params).domain} | Vexa Insight` }
}

export default async function DomainDetailPage({
  params,
}: {
  readonly params: Promise<{ domain: string }>
}) {
  const { domain: domainName } = await params

  const domainRow = await getDomainByName(domainName)
  if (!domainRow) notFound()

  const data = await getDomainDetail(domainRow.id)
  if (data == null) notFound()

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Domain"
        title={domainName}
        back={<BackButton href="/domains">&larr; Domains</BackButton>}
        actions={
          <div className="flex items-center gap-3">
            <Link
              href={`/diagnostics/${domainName}`}
              className="border-border bg-card text-foreground hover:bg-accent focus-visible:outline-ring inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Activity className="h-4 w-4" aria-hidden="true" />
              Diagnostics
            </Link>
            <Navigator currentId={domainName} basePath="/domains" />
          </div>
        }
      />
      <Suspense fallback={<PageSkeleton className="h-[400px]" />}>
        <DomainDetail
          domainId={domainRow.id}
          domainName={domainName}
          data={data}
        />
      </Suspense>
    </PageContainer>
  )
}
