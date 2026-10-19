'use client'

import { Button } from '@/components/ui'
import { useSpfPlan } from '@/hooks/diagnostics'
import { Calculator } from 'lucide-react'
import type { SpfPlannerProps } from './SpfPlannerProps'
import { SpfPlannerResult } from './SpfPlannerResult'

/** Counts the generated record's DNS lookups before it is published. */
export function SpfPlanner({ domainId, record }: Readonly<SpfPlannerProps>) {
  const { plan, error, pending, run } = useSpfPlan(domainId)
  return (
    <div className="border-border space-y-3 border-t pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-foreground text-sm font-medium">Lookup planner</p>
          <p className="text-muted-foreground text-xs">
            Resolves the includes of this record live and counts its lookups
            against the limit of 10. Nothing is stored.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={pending}
          onClick={() => {
            run(record)
          }}
          className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary h-9 gap-2"
        >
          <Calculator aria-hidden className="h-4 w-4" />
          {pending ? 'Counting lookups…' : 'Count lookups'}
        </Button>
      </div>
      {error === null ? null : (
        <p role="alert" className="text-danger text-xs">
          {error}
        </p>
      )}
      {plan === null ? null : <SpfPlannerResult plan={plan} />}
    </div>
  )
}
