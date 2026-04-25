'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { CircleHelp } from 'lucide-react'
import type { InfoTooltipProps } from './InfoTooltipProps'

export function InfoTooltip({ content }: Readonly<InfoTooltipProps>) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="More information"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <CircleHelp className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-pretty">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
