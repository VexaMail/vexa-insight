import type { InsightFactsProps } from './InsightFactsProps'

/** Source, country and failing figures of the insights tile. */
export function InsightFacts({ insights }: Readonly<InsightFactsProps>) {
  const facts = [
    ['Unique sources', insights.uniqueSources],
    ['Failing sources', insights.failingSources],
    ['Countries', insights.countries],
    ['Failing messages', insights.failingMessages],
  ] as const
  return (
    <dl className="space-y-1 text-xs">
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
