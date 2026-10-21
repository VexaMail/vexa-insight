import type { PublicDomainReport } from '../../types/public-check/PublicDomainReport'
import { buildPublicDkimCheck } from './buildPublicDkimCheck'
import { buildPublicDmarcCheck } from './buildPublicDmarcCheck'
import { buildPublicMxCheck } from './buildPublicMxCheck'
import { buildPublicSpfCheck } from './buildPublicSpfCheck'
import { createPublicResolver } from './createPublicResolver'
import { resolvePublicMx } from './resolvePublicMx'
import { resolvePublicTxt } from './resolvePublicTxt'

export async function runPublicDomainCheck(
  domain: string,
): Promise<PublicDomainReport> {
  const resolver = createPublicResolver()
  try {
    const [txt, dmarc, mx, dkim] = await Promise.all([
      resolvePublicTxt(resolver, domain),
      resolvePublicTxt(resolver, `_dmarc.${domain}`),
      resolvePublicMx(resolver, domain),
      buildPublicDkimCheck(resolver, domain),
    ])
    return {
      domain,
      checkedAt: new Date().toISOString(),
      checks: [
        buildPublicSpfCheck(txt),
        dkim,
        buildPublicDmarcCheck(dmarc),
        buildPublicMxCheck(mx),
      ],
    }
  } finally {
    resolver.cancel()
  }
}
