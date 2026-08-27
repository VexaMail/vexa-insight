import type { SpfCheckResult } from '@/types/diagnostics'

export function analyzeAuthorization(spf: string): SpfCheckResult[] {
  const checks: SpfCheckResult[] = []

  const hasIp4 = spf.includes('ip4:')
  const hasIp6 = spf.includes('ip6:')
  const hasInclude = spf.includes('include:')

  checks.push({
    name: 'Authorized senders defined',
    passed: hasIp4 || hasIp6 || hasInclude,
    detail:
      hasIp4 || hasIp6 || hasInclude
        ? 'Authorized sending sources are defined in the record.'
        : 'No authorized senders (ip4, ip6, include) found in the record.',
  })

  const hasBroadIp4 = /ip4:\d+\.\d+\.\d+\.\d+\/\d{1,2}/.test(spf)
  if (hasBroadIp4) {
    const cidrs = spf.match(/ip4:\d+\.\d+\.\d+\.\d+\/(\d+)/g) ?? []
    const hasTooWide = cidrs.some((cidr) => {
      if (!cidr) return false
      const prefixStr = cidr.split('/')[1]
      if (!prefixStr) return false
      const prefix = parseInt(prefixStr, 10)
      return prefix < 24
    })
    checks.push({
      name: 'No overly broad IP ranges',
      passed: !hasTooWide,
      detail: hasTooWide
        ? 'IP range wider than /24 detected. This authorizes a large number of IPs.'
        : 'IP ranges are within reasonable scope.',
    })
  }

  return checks
}
