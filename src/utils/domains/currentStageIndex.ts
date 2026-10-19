import type { EnforcementVerdict } from '@/types/enforcement'

/**
 * Index in the five-step guide of the step that needs work now, or 5 when
 * the domain rejects at full coverage and nothing is left to do.
 */
export function currentStageIndex(
  policy: string | null,
  pct: number | null,
  verdict: EnforcementVerdict,
): number {
  const fullCoverage = pct === null || pct >= 100
  if (verdict === 'fix-first') return 2
  if (policy === 'reject') return fullCoverage ? 5 : 4
  if (policy === 'quarantine') return fullCoverage ? 4 : 3
  return verdict === 'insufficient-data' ? 0 : 3
}
