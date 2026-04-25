import type { SpfCheckResult } from '@/types/diagnostics'

export function analyzeConfiguration(spf: string): SpfCheckResult[] {
  const checks: SpfCheckResult[] = []

  const usesHardFail = spf.includes(' -all')
  const usesSoftFail = spf.includes(' ~all')
  const usesNeutral = spf.includes(' ?all')

  if (usesHardFail) {
    checks.push({
      name: 'Strict enforcement (-all)',
      passed: true,
      detail:
        'SPF uses -all (HardFail). Unauthorized senders will be rejected.',
    })
  } else if (usesSoftFail) {
    checks.push({
      name: 'Strict enforcement (-all)',
      passed: false,
      detail:
        'SPF uses ~all (SoftFail). Consider upgrading to -all for stricter enforcement.',
    })
  } else if (usesNeutral) {
    checks.push({
      name: 'Strict enforcement (-all)',
      passed: false,
      detail:
        'SPF uses ?all (Neutral). This provides no protection. Use -all or ~all.',
    })
  }

  const hasPtrMechanism = / ptr[: ]/i.test(spf) || spf.endsWith(' ptr')
  checks.push({
    name: 'No deprecated PTR mechanism',
    passed: !hasPtrMechanism,
    detail: hasPtrMechanism
      ? 'PTR mechanism is deprecated (RFC 7208) and should be removed.'
      : 'No deprecated PTR mechanism found.',
  })

  return checks
}
