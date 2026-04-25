import type { Metadata } from 'next'

import { DomainDetail } from '@/components/domains'
import { Navigator } from '@/components/ui'
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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/domains"
            className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-400"
          >
            &larr; Domains
          </Link>
          <Link
            href={`/diagnostics/${domainName}`}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Activity className="h-4 w-4" />
            Diagnostics
          </Link>
        </div>
        <Navigator currentId={domainName} basePath="/domains" />
      </div>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        {domainName}
      </h1>
      <Suspense
        fallback={
          <div className="glass-card bg-muted/20 h-[400px] w-full animate-pulse" />
        }
      >
        <DomainDetail
          domainId={domainRow.id}
          domainName={domainName}
          data={data}
        />
      </Suspense>
    </div>
  )
}
