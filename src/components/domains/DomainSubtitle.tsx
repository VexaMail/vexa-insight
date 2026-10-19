import { policySubtitle } from '@/utils/domains'
import { formatRelativeDate } from '@/utils/format'
import type { DomainSubtitleProps } from './DomainSubtitleProps'

/** What the published policy does, and which report it was read from. */
export function DomainSubtitle({ policy }: Readonly<DomainSubtitleProps>) {
  const quoted = policy
    ? `as quoted by ${policy.reporter} on ${formatRelativeDate(policy.reportedAt).absolute}`
    : null
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className="text-muted-foreground text-base sm:text-lg">
        {policySubtitle(policy)}
      </span>
      {quoted ? (
        <span className="text-muted-foreground/80 text-xs">{quoted}</span>
      ) : null}
    </p>
  )
}
