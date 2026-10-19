import { StatusPill } from '@/components/ui'
import { policyModeLabel, policyTone } from '@/utils/domains'
import type { DomainPolicyChipProps } from './DomainPolicyChipProps'

/** The published `p=` value as a pill, as the latest report quoted it. */
export function DomainPolicyChip({
  policy,
  withMode = false,
}: Readonly<DomainPolicyChipProps>) {
  const value = policy?.policy ?? null
  if (value === null) {
    return <StatusPill tone="unknown">No policy reported</StatusPill>
  }
  return (
    <StatusPill tone={policyTone(value)} className="font-mono">
      p={value}
      {withMode ? (
        <span className="font-sans font-normal">
          · {policyModeLabel(value).toLowerCase()}
        </span>
      ) : null}
    </StatusPill>
  )
}
