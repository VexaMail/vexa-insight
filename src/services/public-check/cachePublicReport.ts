import type { PublicDomainReport } from '../../types/public-check/PublicDomainReport'
import { publicCheckState } from './publicCheckState'

export function cachePublicReport(
  report: PublicDomainReport,
): PublicDomainReport {
  if (
    report.checks.some(
      (check) => check.name !== 'DKIM' && check.status === 'unknown',
    )
  )
    return report
  if (publicCheckState.cache.size >= 200) publicCheckState.cache.clear()
  publicCheckState.cache.set(report.domain, {
    expiresAt: Date.now() + 300_000,
    report,
  })
  return report
}
