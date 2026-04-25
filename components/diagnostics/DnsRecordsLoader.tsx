'use client'

import { useDnsDiagnostics } from '@/hooks/diagnostics'

import { DkimCard } from './dns/DkimCard'
import { DmarcCard } from './dns/DmarcCard'
import { MxCard } from './dns/MxCard'
import { SpfCard } from './dns/SpfCard'
import type { DnsRecordsLoaderProps } from './DnsRecordsLoaderProps'

export function DnsRecordsLoader({
  domainId,
}: Readonly<DnsRecordsLoaderProps>) {
  const { data, loading, error } = useDnsDiagnostics(domainId)

  if (loading) {
    return (
      <div className="bg-card text-muted-foreground animate-pulse rounded-lg border p-6 text-center text-sm shadow-sm">
        Resolving DNS records…
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-card text-destructive rounded-lg border p-6 text-center text-sm shadow-sm">
        Failed to load DNS records: {error}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <SpfCard data={data} />
      <DmarcCard data={data} />
      <DkimCard data={data} />
      <MxCard data={data} />
    </div>
  )
}
