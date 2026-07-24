import type { SpfCheckResult } from '@/types/diagnostics'

export function analyzeDependencies(spf: string): SpfCheckResult[] {
  const checks: SpfCheckResult[] = []

  // Every include delegates authorization to an externally controlled
  // record, so all of them count as third-party dependencies.
  const thirdParty = spf.match(/include:([^\s;]+)/gi) ?? []

  checks.push({
    name: 'Third-party includes',
    passed: true,
    detail:
      thirdParty.length > 0
        ? `${thirdParty.length} third-party include(s) found: ${thirdParty.map((i) => i.replace('include:', '')).join(', ')}.`
        : 'No third-party includes detected.',
  })

  const hasRedirect = spf.includes('redirect=')
  checks.push({
    name: 'Redirect usage',
    passed: !hasRedirect,
    detail: hasRedirect
      ? 'SPF record uses redirect=, which delegates SPF to another domain.'
      : 'No redirect mechanism used.',
  })

  return checks
}
