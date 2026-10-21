import type { Resolver } from 'node:dns/promises'
import type { PublicCheck } from '../../types/public-check/PublicCheck'
import type { PublicSpfInspection } from '../../types/public-check/PublicSpfInspection'
import { buildExpandedPublicSpfCheck } from './buildExpandedPublicSpfCheck'
import { buildPublicSpfCheck } from './buildPublicSpfCheck'
import { inspectPublicSpfDependencies } from './inspectPublicSpfDependencies'

export async function resolvePublicSpfCheck(
  resolver: Resolver,
  domain: string,
  records: string[][] | null,
): Promise<PublicCheck> {
  const check = buildPublicSpfCheck(records)
  if (check.status !== 'pass') return check
  const state: PublicSpfInspection = {
    lookups: 0,
    voids: 0,
    queries: 0,
    deadline: Date.now() + 6000,
    issues: [],
    uncertain: false,
  }
  await inspectPublicSpfDependencies(
    resolver,
    { domain, record: check.records[0] ?? '' },
    state,
  )
  return buildExpandedPublicSpfCheck(check, state)
}
