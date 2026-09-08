'use client'

import { HiddenDomainsBadge } from './HiddenDomainsBadge'
import { MAX_VISIBLE_DOMAINS } from './maxVisibleDomains'
import { RelatedDomainLink } from './RelatedDomainLink'
import type { RelatedDomainsCellProps } from './RelatedDomainsCellProps'

export function RelatedDomainsCell({ domains }: RelatedDomainsCellProps) {
  const all = domains ?? []
  if (all.length === 0)
    return <span className="text-muted-foreground text-xs">—</span>

  const visible = all.slice(0, MAX_VISIBLE_DOMAINS)
  const hidden = all.slice(MAX_VISIBLE_DOMAINS)

  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
      {visible.map((d, i) => (
        <RelatedDomainLink
          key={d.domainId}
          domainName={d.domainName}
          showSeparator={i < visible.length - 1 || hidden.length > 0}
        />
      ))}
      {hidden.length > 0 && <HiddenDomainsBadge domains={hidden} />}
    </div>
  )
}
