import { ENFORCEMENT_STAGE_DEFS } from '@/constants/domains'
import type { EnforcementStage, PublishedDmarcPolicy } from '@/types/domains'
import type { EnforcementVerdict } from '@/types/enforcement'
import { currentStageIndex } from './currentStageIndex'

/**
 * Where a domain stands on the way from `p=none` to `p=reject`, from its
 * published policy and the readiness verdict. A guide, not a certification.
 */
export function deriveEnforcementStages(
  policy: PublishedDmarcPolicy | null,
  verdict: EnforcementVerdict,
): EnforcementStage[] {
  const current = currentStageIndex(
    policy?.policy ?? null,
    policy?.pct ?? null,
    verdict,
  )
  return ENFORCEMENT_STAGE_DEFS.map((def, index) => {
    let state: EnforcementStage['state'] = 'todo'
    if (index < current) state = 'done'
    else if (index === current) state = 'current'
    return { ...def, state }
  })
}
