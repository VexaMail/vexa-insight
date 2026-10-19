import { StatusPill } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ChevronRight, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { ENFORCEMENT_VERDICT_COPY } from './enforcementVerdictCopy'
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
      <header className="flex items-center gap-2">
        <ShieldAlert className="text-primary h-4 w-4 shrink-0" aria-hidden />
        <h2 className="text-foreground min-w-0 flex-1 truncate text-sm font-semibold">
          Enforcement readiness
        </h2>
        <StatusPill tone={copy.tone}>{copy.short}</StatusPill>
      </header>
      <p
        className={cn(
          'font-mono text-3xl font-semibold tabular-nums',
          atRisk > 0 ? 'text-danger' : 'text-success',
        )}
      >
        {atRisk.toLocaleString('en-US')}
      </p>
      <p
        className={cn(
          '-mt-2 text-sm font-medium',
          atRisk > 0 ? 'text-danger' : 'text-foreground',
        )}
      >
        legitimate {atRisk === 1 ? 'sender' : 'senders'} at risk
      </p>
      <p className="text-muted-foreground text-xs">
        {readiness.failingByKind.legitimate.toLocaleString('en-US')} of{' '}
        {readiness.totalMessages.toLocaleString('en-US')} messages from them
        fail DMARC and would be lost under enforcement, last {readiness.days}{' '}
        days.
      </p>
      <Link
        href={reviewHref}
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mt-auto inline-flex min-h-10 items-center justify-between gap-2 rounded-md px-4 text-sm font-semibold transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
      >
        Review {atRisk > 0 ? 'senders at risk' : 'failing sources'}
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  )
}
