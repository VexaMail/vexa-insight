'use client'

import type { OpenReportLinkProps } from '@/types/reports'
import { buildReportHref } from '@/utils/reports'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useReportScopeHandler } from '../../hooks/reports/useReportScopeHandler'

/** The row's explicit way into a report: a labelled link, not a bare icon. */
export function OpenReportLink({
  reportId,
  domainName,
  scopeIds,
}: Readonly<OpenReportLinkProps>) {
  const handleOpen = useReportScopeHandler(scopeIds)
  return (
    <Link
      href={buildReportHref(reportId, domainName)}
      onClick={handleOpen}
      className="border-border text-foreground hover:border-primary/50 hover:text-primary focus-visible:ring-ring inline-flex min-h-9 items-center gap-1 rounded-md border px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
    >
      Open
      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  )
}
