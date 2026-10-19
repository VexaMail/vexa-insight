import type { ReportHeaderActionsProps } from '@/types/reports'
import { ArrowUpRight, Globe } from 'lucide-react'
import Link from 'next/link'

/** The report's domain as a link to its overview, like a source's host. */
export function ReportHeaderDomain({
  domain,
}: Readonly<ReportHeaderActionsProps>) {
  return (
    <Link
      href={`/domains/${encodeURIComponent(domain)}`}
      className="text-primary focus-visible:ring-ring inline-flex h-6 min-w-0 items-center gap-1.5 rounded-sm text-sm font-medium hover:underline focus-visible:ring-2 focus-visible:outline-none"
    >
      <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="sr-only">Domain:</span>
      <span className="truncate">{domain}</span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </Link>
  )
}
