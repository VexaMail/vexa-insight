import { diagnosticsSectionHref, findingActionVerb } from '@/utils/diagnostics'
import Link from 'next/link'
import type { FindingLinkProps } from './FindingLinkProps'
import { FindingMoreMenu } from './FindingMoreMenu'

/** The verb that fits the finding, then copy and details behind "...". */
export function FindingActions({ finding, base }: Readonly<FindingLinkProps>) {
  return (
    <div className="flex items-center gap-1.5 md:justify-end print:hidden">
      <Link
        href={diagnosticsSectionHref(base, finding.section)}
        className="border-primary/50 text-primary hover:bg-primary/10 focus-visible:ring-ring inline-flex h-8 min-w-[4.5rem] items-center justify-center rounded-md border px-3 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        {findingActionVerb(finding)}
        <span className="sr-only"> {finding.check}</span>
      </Link>
      <FindingMoreMenu finding={finding} base={base} />
    </div>
  )
}
