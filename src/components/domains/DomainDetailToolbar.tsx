import { Navigator } from '@/components/ui'
import type { DomainDetailToolbarProps } from '@/types/domains'
import { Activity } from 'lucide-react'
import Link from 'next/link'

/** Diagnostics link and previous / next domain, among the header actions. */
export function DomainDetailToolbar({
  domainName,
}: Readonly<DomainDetailToolbarProps>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/diagnostics/${encodeURIComponent(domainName)}`}
        className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
      >
        <Activity className="text-primary h-4 w-4" aria-hidden="true" />
        Diagnostics
      </Link>
      <Navigator currentId={domainName} basePath="/domains" />
    </div>
  )
}
