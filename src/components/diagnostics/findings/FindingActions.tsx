import { diagnosticsSectionHref } from '@/utils/diagnostics'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CopyButton } from '../shared'
import type { FindingLinkProps } from './FindingLinkProps'

/** Copy the recommended record when there is one; always open the evidence. */
export function FindingActions({ finding, base }: Readonly<FindingLinkProps>) {
  return (
    <div className="flex flex-wrap items-center gap-1 md:justify-end print:hidden">
      {finding.fix === null ? null : (
        <CopyButton text={finding.fix.value} label="Copy record" />
      )}
      <Link
        href={diagnosticsSectionHref(base, finding.section)}
        className="text-primary hover:bg-primary/10 focus-visible:ring-ring inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none"
      >
        View details
        <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        <span className="sr-only"> for {finding.check}</span>
      </Link>
    </div>
  )
}
