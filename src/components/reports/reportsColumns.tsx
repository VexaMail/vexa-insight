'use client'

import {
  Button,
  SortIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { formatReportDateRange } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, FileText } from 'lucide-react'
import Link from 'next/link'
import type { GetReportsColumnsParams } from './GetReportsColumnsParams'
import type { ReportRow } from './ReportRow'
import { MAX_VISIBLE_DOMAINS } from './maxVisibleDomains'

export function getReportsColumns({
  dispatch,
  sortKey,
  sortDir,
  filtered,
  domainName,
  setScope,
}: GetReportsColumnsParams): ColumnDef<ReportRow>[] {
  return [
    {
      id: 'relatedDomains',
      header: () => (
        <div className="text-muted-foreground text-xs font-medium select-none">
          Related Domains
        </div>
      ),
      cell: ({ row }) => {
        const domains = row.original.relatedDomains ?? []
        if (domains.length === 0)
          return <span className="text-muted-foreground text-xs">—</span>

        const visibleDomains = domains.slice(0, MAX_VISIBLE_DOMAINS)
        const hiddenCount = domains.length - MAX_VISIBLE_DOMAINS

        return (
          <div className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
            {visibleDomains.map((d, i) => (
              <div key={d.domainId} className="flex items-center">
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/domains/${encodeURIComponent(d.domainName)}`}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="hover:text-foreground max-w-[120px] truncate transition-colors hover:underline"
                      >
                        {d.domainName}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{d.domainName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {(i < visibleDomains.length - 1 || hiddenCount > 0) && (
                  <span>,</span>
                )}
              </div>
            ))}
            {hiddenCount > 0 && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help text-xs">
                      +{hiddenCount} more
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col gap-1">
                      {domains.slice(MAX_VISIBLE_DOMAINS).map((d) => (
                        <span key={d.domainId} className="text-xs">
                          {d.domainName}
                        </span>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )
      },
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'reportId',
      header: () => (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
          onClick={() => {
            dispatch({ type: 'SET_SORT', payload: { key: 'reportId' } })
          }}
        >
          Report ID
          <SortIcon active={sortKey === 'reportId'} dir={sortDir} />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="text-primary h-3.5 w-3.5 shrink-0" />
          <span className="text-foreground font-mono text-xs">
            {row.getValue('reportId')}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'orgName',
      header: () => (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
          onClick={() => {
            dispatch({ type: 'SET_SORT', payload: { key: 'orgName' } })
          }}
        >
          Organization
          <SortIcon active={sortKey === 'orgName'} dir={sortDir} />
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.getValue('orgName')}
        </span>
      ),
    },
    {
      accessorKey: 'beginDate',
      header: () => (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
          onClick={() => {
            dispatch({ type: 'SET_SORT', payload: { key: 'beginDate' } })
          }}
        >
          Date Range
          <SortIcon active={sortKey === 'beginDate'} dir={sortDir} />
        </button>
      ),
      cell: ({ row }) => {
        const report = row.original
        return (
          <span className="text-muted-foreground text-sm">
            {formatReportDateRange(report.beginDate, report.endDate)}
          </span>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const href = domainName
          ? `/reports/${String(row.original.id)}?fromDomain=${encodeURIComponent(domainName)}`
          : `/reports/${String(row.original.id)}`

        return (
          <Link
            href={href}
            onClick={() => {
              setScope(filtered.map((r) => r.id.toString()))
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-7 w-7"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        )
      },
      enableGlobalFilter: false,
    },
  ]
}
