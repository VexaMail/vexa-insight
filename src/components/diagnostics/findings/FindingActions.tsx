import { diagnosticsSectionHref, findingActionVerb } from '@/utils/diagnostics'
import Link from 'next/link'
import type { FindingLinkProps } from './FindingLinkProps'
import { FindingMoreMenu } from './FindingMoreMenu'

/** Verify or View the evidence, then copy and details behind "More". */
export function FindingActions({ finding, base }: Readonly<FindingLinkProps>) {
  return (
    <div className="flex items-center gap-2 print:hidden">
      <Link
        href={diagnosticsSectionHref(base, finding.section)}
        className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-9 min-w-[4.5rem] items-center justify-center rounded-md border px-3 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        {findingActionVerb(finding)}
        <span className="sr-only"> {finding.check}</span>
      </Link>
      <FindingMoreMenu finding={finding} base={base} />
    </div>
  )
}
