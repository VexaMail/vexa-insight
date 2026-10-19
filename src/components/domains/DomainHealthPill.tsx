import { StatusPill } from '@/components/ui'
import { domainHealthBadge } from '@/utils/domains'
import { verdictPillVariant } from '@/utils/ui'
import type { DomainHealthPillProps } from './DomainHealthPillProps'
import { ToneIcon } from './ToneIcon'

/**
 * A domain's compliance band as a pill; no mail reads as no data, and a
 * domain gone silent reads neutral with its last known band.
 */
export function DomainHealthPill(props: Readonly<DomainHealthPillProps>) {
  const badge = domainHealthBadge(props)
  const { tone } = badge
  return (
    <StatusPill
      tone={tone}
      variant={verdictPillVariant(tone)}
      dot={tone === 'unknown'}
      icon={tone === 'unknown' ? null : <ToneIcon tone={tone} />}
      title={badge.title}
    >
      {badge.label}
    </StatusPill>
  )
}
