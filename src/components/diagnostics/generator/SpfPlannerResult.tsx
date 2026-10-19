import { StatusPill } from '@/components/ui'
import { spfFlattenSuggestions, spfPlanWarnings } from '@/utils/diagnostics'
import { Check, X } from 'lucide-react'
import { SpfFlattenList } from './SpfFlattenList'
import type { SpfPlannerResultProps } from './SpfPlannerResultProps'
import { SpfPlanWarningList } from './SpfPlanWarningList'

/** Lookup count against the limit, flattening candidates and warnings. */
export function SpfPlannerResult({ plan }: Readonly<SpfPlannerResultProps>) {
  const published =
    plan.publishedLookups === null
      ? 'no SPF record published'
      : `published record: ${String(plan.publishedLookups)} lookups`
  return (
    <div aria-live="polite" className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <StatusPill
          tone={plan.withinLimit ? 'success' : 'danger'}
          icon={plan.withinLimit ? <Check /> : <X />}
        >
          {plan.withinLimit ? 'Within the limit' : 'Over the limit'}
        </StatusPill>
        <span className="text-foreground font-mono text-sm tabular-nums">
          {plan.plannedLookups} of {plan.limit} lookups
        </span>
        <span className="text-muted-foreground text-xs">{published}</span>
      </div>
      <SpfFlattenList suggestions={spfFlattenSuggestions(plan.tree)} />
      <SpfPlanWarningList warnings={spfPlanWarnings(plan.tree)} />
    </div>
  )
}
