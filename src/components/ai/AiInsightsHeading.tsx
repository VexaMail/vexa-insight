'use client'

import { IconTile } from '@/components/ui'
import { Sparkles } from 'lucide-react'

/** The icon square and title shared by every state of the diagnostics panel. */
export function AiInsightsHeading() {
  return (
    <>
      <IconTile size="sm">
        <Sparkles />
      </IconTile>
      <h3 className="text-foreground text-sm font-semibold">
        AI diagnostics insights
      </h3>
    </>
  )
}
