'use client'

import type { EmailPipelineHeaderProps } from '@/types/ingest'
import { ChevronDown, ChevronUp } from 'lucide-react'
import StatusPill from './StatusPill'

export function EmailPipelineHeader({
  item,
  headlineText,
  overallStatus,
  expanded,
  onToggleExpanded,
}: EmailPipelineHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-semibold">
          {item.label}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <StatusPill status={overallStatus} text={headlineText} />
        </div>
      </div>
      <button
        type="button"
        onClick={onToggleExpanded}
        aria-expanded={expanded}
        className="border-border bg-surface-1 text-muted-foreground hover:bg-surface-2 hover:text-foreground flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors"
      >
        {expanded ? 'Collapse' : 'Details'}
        {expanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>
    </div>
  )
}
