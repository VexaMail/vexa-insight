import type { PublicDomainReport } from '../../types/public-check/PublicDomainReport'
import { buildPublicConfigurationScore } from './buildPublicConfigurationScore'
import { buildPublicDkimCheck } from './buildPublicDkimCheck'
import { buildPublicMxCheck } from './buildPublicMxCheck'
import { createPublicResolver } from './createPublicResolver'
import { resolvePublicDmarcCheck } from './resolvePublicDmarcCheck'
import { resolvePublicMx } from './resolvePublicMx'
import { resolveRootPublicSpfCheck } from './resolveRootPublicSpfCheck'

export async function runPublicDomainCheck(
  domain: string,
  selector?: string,
): Promise<PublicDomainReport> {
  const resolver = createPublicResolver()
  const deadline = setTimeout(() => {
    resolver.cancel()
  }, 12_000)
  try {
    const [spf, dmarc, mx, dkim] = await Promise.all([
      resolveRootPublicSpfCheck(resolver, domain),
      resolvePublicDmarcCheck(resolver, domain),
      resolvePublicMx(resolver, domain),
      buildPublicDkimCheck(resolver, domain, selector),
    ])
    const checks = [spf, dkim, dmarc, buildPublicMxCheck(mx)]
    return {
      domain,
      ...(selector ? { selector } : {}),
      checkedAt: new Date().toISOString(),
      checks,
      score: buildPublicConfigurationScore(checks),
    }
  } finally {
    clearTimeout(deadline)
    resolver.cancel()
  }
}
