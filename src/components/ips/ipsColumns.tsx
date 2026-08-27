'use client'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import type { IpSummaryData } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import {
  getAuthHealthStatus,
  getRateColorClass,
  mainDomainFilterFn,
} from '@/utils/ips'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import AuthHealthBadge from './AuthHealthBadge'
import type { GetIpsColumnsParams } from './GetIpsColumnsParams'
import { IpDisplay } from './IpDisplay'

export function getIpsColumns({
  refreshingIps,
  localHostnames,
  localHostnameLookupTimestamps,
  handleRefresh,
  ips,
  setScope,
}: GetIpsColumnsParams): ColumnDef<IpSummaryData>[] {
  return [
    {
      accessorKey: 'countryCode',
      header: 'Country',
      cell: ({ row }) => {
        const countryCode = row.original.countryCode
        return (
          <IpDisplay
            ip={row.original.ip}
            countryCode={countryCode}
            layout="none"
            showIp={false}
            showHostname={false}
          />
        )
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'All') return true
        return row.getValue(columnId) === filterValue
      },
    },
    {
      accessorKey: 'ip',
      header: ({ column }) => (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          IP Address
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </button>
      ),
      cell: ({ row }) => {
        const ip = row.getValue<string>('ip')
        return (
          <IpDisplay
            ip={ip}
            layout="none"
            showFlag={false}
            showHostname={false}
            ipAsLink={false}
          />
        )
      },
    },
    {
      accessorKey: 'hostname',
      header: ({ column }) => (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Hostname
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </button>
      ),
      cell: ({ row }) => {
        const ip = row.getValue<string>('ip')
        const isRefreshing = refreshingIps.has(ip)
        const hostname = localHostnames[ip] ?? row.getValue<string>('hostname')
        const hostnameLastLookupAt =
          localHostnameLookupTimestamps[ip] ?? row.original.hostnameLastLookupAt

        return (
          <IpDisplay
            ip={ip}
            hostname={hostname}
            hostnameLastLookupAt={hostnameLastLookupAt}
            layout="none"
            showFlag={false}
            showIp={false}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        )
      },
      filterFn: mainDomainFilterFn,
    },
    {
      accessorKey: 'fullyAlignedRate',
      header: ({ column }) => (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Auth Status
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </button>
      ),
      cell: ({ row }) => {
        const rate = row.original.fullyAlignedRate
        const status = getAuthHealthStatus(rate)
        return (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-default">
                  <AuthHealthBadge status={status} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {rate.toFixed(1)}% of messages fully authenticated (SPF +
                  DKIM)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      },
    },
    {
      accessorKey: 'spfPassRate',
      header: 'SPF',
      cell: ({ row }) => {
        const rate = row.original.spfPassRate
        const colorClass = getRateColorClass(rate)
        return (
          <span className={`text-sm font-medium tabular-nums ${colorClass}`}>
            {rate.toFixed(1)}%
          </span>
        )
      },
      meta: { className: 'hidden lg:table-cell' },
    },
    {
      accessorKey: 'dkimPassRate',
      header: 'DKIM',
      cell: ({ row }) => {
        const rate = row.original.dkimPassRate
        const colorClass = getRateColorClass(rate)
        return (
          <span className={`text-sm font-medium tabular-nums ${colorClass}`}>
            {rate.toFixed(1)}%
          </span>
        )
      },
      meta: { className: 'hidden lg:table-cell' },
    },
    {
      accessorKey: 'lastSeen',
      header: ({ column }) => (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Last Seen
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </button>
      ),
      cell: ({ row }) => {
        const lastSeen = row.original.lastSeen
        if (!lastSeen)
          return (
            <span className="text-muted-foreground/50 text-sm italic">
              Unknown
            </span>
          )
        const { relative, absolute } = formatRelativeDate(lastSeen)
        return (
          <span className="text-muted-foreground text-sm" title={absolute}>
            {relative}
          </span>
        )
      },
      meta: { className: 'hidden md:table-cell' },
    },
    {
      accessorKey: 'totalMessages',
      header: ({ column }) => (
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Volume
          {column.getIsSorted() === 'asc' && (
            <ArrowUp className="text-primary ml-1 h-3 w-3" />
          )}
          {column.getIsSorted() === 'desc' && (
            <ArrowDown className="text-primary ml-1 h-3 w-3" />
          )}
          {!column.getIsSorted() && (
            <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
          )}
        </button>
      ),
      cell: ({ row }) => {
        const val = row.original.totalMessages
        return (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {val.toLocaleString()}
          </span>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const ipStr = row.original.ip
        return (
          <Link
            href={`/ips/${encodeURIComponent(ipStr)}`}
            onClick={(e) => {
              e.stopPropagation()
              setScope(ips.map((i) => i.ip))
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
