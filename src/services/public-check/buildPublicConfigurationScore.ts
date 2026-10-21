import type { PublicCheck } from '../../types/public-check/PublicCheck'
import type { PublicConfigurationScore } from '../../types/public-check/PublicConfigurationScore'

export function buildPublicConfigurationScore(
  checks: readonly PublicCheck[],
): PublicConfigurationScore {
  const spf = checks.find((check) => check.name === 'SPF')?.points ?? null
  const dmarc = checks.find((check) => check.name === 'DMARC')?.points ?? null
  return {
    value: spf === null || dmarc === null ? null : spf + dmarc,
    spf,
    dmarc,
  }
}
