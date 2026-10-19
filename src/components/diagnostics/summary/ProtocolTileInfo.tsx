'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { Info } from 'lucide-react'
import type { FindingProps } from '../findings/FindingProps'

/** What the tile's check found, in one sentence, above the tile's link. */
export function ProtocolTileInfo({ finding }: Readonly<FindingProps>) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={`About ${finding.protocol}`}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring relative z-10 -m-1 rounded p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none print:hidden"
          >
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-pretty">
          <span className="font-medium">{finding.state}.</span> {finding.detail}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
