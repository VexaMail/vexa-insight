import { buildFindingSteps } from '@/utils/diagnostics'
import { ChevronRight } from 'lucide-react'
import type { FindingProps } from './FindingProps'
import { FindingStepItem } from './FindingStepItem'

/** The finding's correction flow, folded: Observed, Expected, Fix, Verify. */
export function FindingSteps({ finding }: Readonly<FindingProps>) {
  return (
    <details className="group">
      <summary className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex min-h-8 cursor-pointer list-none items-center gap-1 rounded text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
        <ChevronRight
          aria-hidden
          className="h-3.5 w-3.5 transition-transform group-open:rotate-90"
        />
        Observed, expected, fix and verify
        <span className="sr-only"> for {finding.check}</span>
      </summary>
      <ol className="mt-2 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {buildFindingSteps(finding).map((step, index) => (
          <FindingStepItem key={step.key} step={step} index={index} />
        ))}
      </ol>
    </details>
  )
}
