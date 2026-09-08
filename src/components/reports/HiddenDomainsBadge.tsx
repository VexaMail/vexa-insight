'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import type { HiddenDomainsBadgeProps } from './HiddenDomainsBadgeProps'

/** "+N more" affordance listing the domains that did not fit in the cell. */
export function HiddenDomainsBadge({ domains }: HiddenDomainsBadgeProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help text-xs">+{domains.length} more</span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-1">
            {domains.map((d) => (
              <span key={d.domainId} className="text-xs">
                {d.domainName}
              </span>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
