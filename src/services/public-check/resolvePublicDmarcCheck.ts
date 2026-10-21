import type { Resolver } from 'node:dns/promises'
import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { buildPublicDmarcCheck } from './buildPublicDmarcCheck'
import { discoverInheritedPublicDmarc } from './discoverInheritedPublicDmarc'
import { resolvePublicTxt } from './resolvePublicTxt'

export async function resolvePublicDmarcCheck(
  resolver: Resolver,
  domain: string,
): Promise<PublicCheck> {
  const records = await resolvePublicTxt(resolver, `_dmarc.${domain}`)
  const direct = buildPublicDmarcCheck(records)
  if (records === null || direct.records.length > 0) return direct
  return discoverInheritedPublicDmarc(resolver, domain)
}
