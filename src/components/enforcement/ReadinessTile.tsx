import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ENFORCEMENT_VERDICT_COPY } from './enforcementVerdictCopy'
import { ReadinessTileHeader } from './ReadinessTileHeader'
import type { ReadinessTileProps } from './ReadinessTileProps'

/** Legitimate senders that enforcement would cut off, and where to fix them. */
export function ReadinessTile({
  readiness,
  reviewHref,
}: Readonly<ReadinessTileProps>) {
  const copy = ENFORCEMENT_VERDICT_COPY[readiness.verdict]
  const atRisk = readiness.failingSourcesByKind.legitimate
  return (
    <section className="glass-card flex min-w-0 flex-col gap-3 p-4">
      <ReadinessTileHeader
        tone={copy.tone}
        label={copy.short}
        atRisk={atRisk > 0}
        reviewHref={reviewHref}
      />
      <p className="flex items-baseline gap-2.5">
        <span
          className={cn(
            'font-mono text-3xl leading-tight font-semibold tabular-nums',
            atRisk > 0 ? 'text-danger' : 'text-success',
          )}
        >
          {atRisk.toLocaleString('en-US')}
        </span>
        <span className="text-foreground text-sm font-medium">
          legitimate {atRisk === 1 ? 'sender' : 'senders'} at risk
        </span>
      </p>
      <p className="text-muted-foreground text-sm">
        {readiness.failingByKind.legitimate.toLocaleString('en-US')} of{' '}
        {readiness.totalMessages.toLocaleString('en-US')} messages from them
        fail DMARC and would be lost under p=quarantine or p=reject, last{' '}
        {readiness.days} days.
      </p>
      <Link
        href={reviewHref}
        className="bg-info text-info-foreground hover:bg-info/90 focus-visible:ring-ring mt-auto inline-flex min-h-9 w-fit items-center gap-2 rounded-md px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
      >
        Review {atRisk > 0 ? 'senders' : 'failing sources'}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  )
}
