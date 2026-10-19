import { StatusPill } from '@/components/ui'
import { domainHealthTone, getDomainHealth } from '@/utils/domains'
import { verdictPillVariant } from '@/utils/ui'
import type { DomainHealthPillProps } from './DomainHealthPillProps'
import { ToneIcon } from './ToneIcon'

/** A domain's compliance band as a pill; no mail reads as no data. */
export function DomainHealthPill(props: Readonly<DomainHealthPillProps>) {
  const health = getDomainHealth(props)
  const tone = domainHealthTone(health)
  return (
    <StatusPill
      tone={tone}
      variant={verdictPillVariant(tone)}
      dot={tone === 'unknown'}
      icon={tone === 'unknown' ? null : <ToneIcon tone={tone} />}
    >
      {health === 'Active' ? 'Passing' : health}
    </StatusPill>
  )
}
