import { StatusPill } from '@/components/ui'
import { domainHealthTone, getDomainHealth } from '@/utils/domains'
import type { DomainHealthPillProps } from './DomainHealthPillProps'

/** A domain's compliance band as a pill; no mail reads as no data. */
export function DomainHealthPill(props: Readonly<DomainHealthPillProps>) {
  const health = getDomainHealth(props)
  return (
    <StatusPill tone={domainHealthTone(health)} dot>
      {health === 'Active' ? 'Passing' : health}
    </StatusPill>
  )
}
