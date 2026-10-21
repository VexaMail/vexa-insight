import type { Resolver } from 'node:dns/promises'
import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { resolvePublicSpfCheck } from './resolvePublicSpfCheck'
import { resolvePublicTxt } from './resolvePublicTxt'

export async function resolveRootPublicSpfCheck(
  resolver: Resolver,
  domain: string,
): Promise<PublicCheck> {
  return resolvePublicSpfCheck(
    resolver,
    domain,
    await resolvePublicTxt(resolver, domain),
  )
}
