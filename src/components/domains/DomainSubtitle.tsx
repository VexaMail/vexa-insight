import { policySubtitle } from '@/utils/domains'
import { formatRelativeDate } from '@/utils/format'
import type { DomainSubtitleProps } from './DomainSubtitleProps'

/** What the published policy does, and when the newest report period ended. */
export function DomainSubtitle({ policy }: Readonly<DomainSubtitleProps>) {
  const last = policy ? formatRelativeDate(policy.reportedAt) : null
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-base sm:text-lg">
        {policySubtitle(policy)}
      </p>
      <p className="text-muted-foreground text-xs">
        {last && policy ? (
          <>
            Last report period ended{' '}
            <span className="text-foreground" title={last.absolute}>
              {last.relative}
            </span>
            , from {policy.reporter}; policy as quoted there
          </>
        ) : (
          'No aggregate report yet'
        )}
      </p>
    </div>
  )
}
