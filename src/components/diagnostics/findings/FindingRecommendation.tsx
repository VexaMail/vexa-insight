import type { FindingProps } from './FindingProps'

/** What to change; names the host when a record can be copied. */
export function FindingRecommendation({ finding }: Readonly<FindingProps>) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-foreground/90 text-sm">{finding.recommendation}</p>
      {finding.fix === null ? null : (
        <p className="text-muted-foreground text-xs">
          Publish as TXT at{' '}
          <span className="text-foreground font-mono break-all">
            {finding.fix.host}
          </span>
        </p>
      )}
    </div>
  )
}
