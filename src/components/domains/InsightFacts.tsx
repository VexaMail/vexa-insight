import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { domainHealthTone, getDomainHealth } from '@/utils/domains'
import type { InsightFactsProps } from './InsightFactsProps'

/** Compliance, volume, source and country figures of the insights tile. */
export function InsightFacts({
  insights,
  summary,
}: Readonly<InsightFactsProps>) {
  const hasData = summary.totalMessages > 0
  const facts = [
    ['Unique sources', insights.uniqueSources],
    ['Failing sources', insights.failingSources],
    ['Forwarders / lists', insights.forwardedSources],
    ['Countries', insights.countries],
  ] as const
  return (
    <dl className="space-y-1.5 text-xs">
      <div className="flex justify-between gap-2">
        <dt className="text-muted-foreground">Compliance</dt>
        <dd
          className={cn(
            'font-mono font-semibold tabular-nums',
            STATUS_TONE_TEXT_CLASSES[
              domainHealthTone(getDomainHealth(summary))
            ],
          )}
        >
          {hasData ? `${summary.passRatePercent.toFixed(1)}%` : 'n/a'}
        </dd>
      </div>
      <div className="flex justify-between gap-2">
        <dt className="text-muted-foreground">Total messages</dt>
        <dd className="text-foreground font-mono tabular-nums">
          {summary.totalMessages.toLocaleString('en-US')}
        </dd>
      </div>
      {facts.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-2">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="text-foreground font-mono tabular-nums">
            {value.toLocaleString('en-US')}
          </dd>
        </div>
      ))}
    </dl>
  )
}
