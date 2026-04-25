import type { SpfCheckResult } from '@/types/diagnostics'

export function analyzeDependencies(spf: string): SpfCheckResult[] {
  const checks: SpfCheckResult[] = []

  const includes = spf.match(/include:([^\s;]+)/gi) ?? []
  const thirdParty = includes.filter((inc) => {
    const domain = inc.replace('include:', '')
    return !domain.includes('_spf') || domain.includes('google')
  })

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
