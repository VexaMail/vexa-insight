'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import Link from 'next/link'
import type { RelatedDomainLinkProps } from './RelatedDomainLinkProps'

/** One domain of the related-domains cell, truncated with a tooltip. */
export function RelatedDomainLink({
  domainName,
  showSeparator,
}: RelatedDomainLinkProps) {
  return (
    <div className="flex items-center">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/domains/${encodeURIComponent(domainName)}`}
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="hover:text-foreground max-w-[120px] truncate transition-colors hover:underline"
            >
              {domainName}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{domainName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {showSeparator ? <span>,</span> : null}
    </div>
  )
}
