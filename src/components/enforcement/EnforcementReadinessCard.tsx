import { Panel, StatTile, StatusPill } from '@/components/ui'
import { ShieldAlert } from 'lucide-react'
import type { EnforcementReadinessCardProps } from './EnforcementReadinessCardProps'
import { ENFORCEMENT_VERDICT_COPY } from './enforcementVerdictCopy'
import { FAILING_KIND_LABEL } from './failingKindLabel'
import { FAILING_KIND_TONE } from './failingKindTone'
import { FailingSourcesTable } from './FailingSourcesTable'

/**
 * Policy simulation for one domain: what `p=quarantine` or `p=reject` would
 * have stopped over the window, and whether any of it was real mail.
 */
export function EnforcementReadinessCard({
  readiness,
}: EnforcementReadinessCardProps) {
  const copy = ENFORCEMENT_VERDICT_COPY[readiness.verdict]
  const kinds = ['legitimate', 'forwarded', 'unknown'] as const
  return (
    <Panel
      icon={<ShieldAlert />}
      title={`Enforcement readiness, last ${String(readiness.days)} days`}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <StatusPill tone={copy.tone} dot>
            {copy.title}
          </StatusPill>
          <p className="text-muted-foreground text-sm">{copy.advice}</p>
          <p className="text-muted-foreground text-xs">
            Based on {readiness.totalMessages.toLocaleString('en-US')} messages
            over {readiness.reportDays} report days. Under enforcement,{' '}
            {readiness.failingMessages.toLocaleString('en-US')} would have been
            quarantined or rejected.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {kinds.map((kind) => (
            <StatTile
              key={kind}
              label={FAILING_KIND_LABEL[kind]}
              value={readiness.failingByKind[kind].toLocaleString('en-US')}
              tone={
                readiness.failingByKind[kind] > 0
                  ? FAILING_KIND_TONE[kind]
                  : 'neutral'
              }
              hint={`failing messages from ${String(readiness.failingSourcesByKind[kind])} sources`}
            />
          ))}
        </div>
        {readiness.topFailingSources.length > 0 && (
          <FailingSourcesTable sources={readiness.topFailingSources} />
        )}
      </div>
    </Panel>
  )
}
