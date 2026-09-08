'use client'

import {
  SortableHeaderButton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import type { IpSummaryData } from '@/types/ips'
import { getAuthHealthStatus } from '@/utils/ips'
import type { ColumnDef } from '@tanstack/react-table'
import AuthHealthBadge from '../AuthHealthBadge'

export const authStatusColumn: ColumnDef<IpSummaryData> = {
  accessorKey: 'fullyAlignedRate',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Auth Status" />
  ),
  cell: ({ row }) => {
    const rate = row.original.fullyAlignedRate

    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
              <AuthHealthBadge status={getAuthHealthStatus(rate)} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {rate.toFixed(1)}% of messages fully authenticated (SPF + DKIM)
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
}
