'use client'

import { Button } from '@/components/ui'
import { Sparkles } from 'lucide-react'
import type { AiDiagnosticsIdleCardProps } from './AiDiagnosticsIdleCardProps'
import { AiInsightsHeading } from './AiInsightsHeading'

/** Invitation to run the analysis, shown before the first request. */
export function AiDiagnosticsIdleCard({
  onAnalyze,
}: AiDiagnosticsIdleCardProps) {
  return (
    <div className="glass-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <AiInsightsHeading />
        </div>
        <Button type="button" onClick={onAnalyze} className="h-10 print:hidden">
          <Sparkles aria-hidden="true" />
          Analyze domain
        </Button>
      </div>
      <p className="text-muted-foreground mt-2 text-sm">
        The runbook above explains what to fix and how to validate it. AI adds
        correlation across DNS, historical statistics, and DMARC reports to
        prioritize less obvious causes.
      </p>
    </div>
  )
}
