'use client'

import { IconTile } from '@/components/ui'
import { Sparkles } from 'lucide-react'

/** The icon square and title shared by every state of the report panel. */
export function AiReportInsightsHeading() {
  return (
    <>
      <IconTile size="sm">
        <Sparkles />
      </IconTile>
      <h3 className="text-foreground text-sm font-semibold">AI insights</h3>
    </>
  )
}
