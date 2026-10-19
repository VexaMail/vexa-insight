import { StatTile } from '@/components/ui'
import { BellOff, Lock, TriangleAlert } from 'lucide-react'
import type { DomainsAttentionTilesProps } from './DomainsAttentionTilesProps'

/** The domains that need a look: low compliance, silent, and enforcing. */
export function DomainsAttentionTiles({
  kpis,
  staleDays,
}: Readonly<DomainsAttentionTilesProps>) {
  return (
    <>
      <StatTile
        variant="feature"
        icon={<TriangleAlert />}
        label="Need attention"
        value={kpis.needAttention.toLocaleString('en-US')}
        tone={kpis.needAttention > 0 ? 'warning' : 'success'}
        hint="All reports · below 95% compliance"
      />
      <StatTile
        variant="feature"
        icon={<BellOff />}
        label="Silent"
        value={kpis.silent.toLocaleString('en-US')}
        tone={kpis.silent > 0 ? 'warning' : 'success'}
        hint={`As of today · no report for over ${String(staleDays)} days`}
      />
      <StatTile
        variant="feature"
        icon={<Lock />}
        label="Enforcing"
        value={kpis.enforcing.toLocaleString('en-US')}
        tone={kpis.enforcing > 0 ? 'info' : 'neutral'}
        hint={`Latest report · of ${String(kpis.withPolicy)} with a policy`}
      />
    </>
  )
}
