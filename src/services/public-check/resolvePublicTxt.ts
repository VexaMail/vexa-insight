import type { Resolver } from 'node:dns/promises'
import { publicDnsFailure } from './publicDnsFailure'

export async function resolvePublicTxt(
  resolver: Resolver,
  name: string,
): Promise<string[][] | null> {
  try {
    return await resolver.resolveTxt(name)
  } catch (error) {
    return publicDnsFailure(error)
  }
}
