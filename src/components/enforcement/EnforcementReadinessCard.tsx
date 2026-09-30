import type { EnforcementReadinessCardProps } from './EnforcementReadinessCardProps'
import { EnforcementStat } from './EnforcementStat'
import { ENFORCEMENT_VERDICT_COPY } from './enforcementVerdictCopy'
import { FAILING_KIND_LABEL } from './failingKindLabel'
import { FailingSourcesTable } from './FailingSourcesTable'

/**
 * Policy simulation for one domain: what `p=quarantine` or `p=reject` would
 * have stopped over the window, and whether any of it was real mail.
 */
export function EnforcementReadinessCard({
  readiness,
}: EnforcementReadinessCardProps) {
  const copy = ENFORCEMENT_VERDICT_COPY[readiness.verdict]
  return (
    <section aria-labelledby="enforcement-heading" className="space-y-4">
      <h2
        id="enforcement-heading"
        className="text-lg font-medium text-zinc-900 dark:text-zinc-50"
      >
        Enforcement readiness (last {readiness.days} days)
      </h2>
      <div
        className={`rounded-lg border-l-4 bg-white p-4 dark:bg-zinc-800 ${copy.tone}`}
      >
        <p className="font-medium text-zinc-900 dark:text-zinc-50">
          {copy.title}
        </p>
        <p className="text-muted-foreground mt-1 text-sm">{copy.advice}</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Based on {readiness.totalMessages.toLocaleString()} messages over{' '}
          {readiness.reportDays} report days. Under enforcement,{' '}
          {readiness.failingMessages.toLocaleString()} would have been
          quarantined or rejected.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <EnforcementStat
          label={FAILING_KIND_LABEL.legitimate}
          value={readiness.failingByKind.legitimate}
        />
        <EnforcementStat
          label={FAILING_KIND_LABEL.forwarded}
          value={readiness.failingByKind.forwarded}
        />
        <EnforcementStat
          label={FAILING_KIND_LABEL.unknown}
          value={readiness.failingByKind.unknown}
        />
      </div>
      {readiness.topFailingSources.length > 0 && (
        <FailingSourcesTable sources={readiness.topFailingSources} />
      )}
    </section>
  )
}
