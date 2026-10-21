import type { Resolver } from 'node:dns/promises'
import type { PublicSpfInspection } from '../../types/public-check/PublicSpfInspection'
import type { PublicSpfVisitor } from '../../types/public-check/PublicSpfVisitor'
import { getPublicSpfIssues } from './getPublicSpfIssues'
import { resolvePublicTxt } from './resolvePublicTxt'

export async function inspectPublicSpfTarget(
  resolver: Resolver,
  target: string,
  state: PublicSpfInspection,
  visit: PublicSpfVisitor,
): Promise<void> {
  if (Date.now() > state.deadline || state.queries >= 24) {
    state.uncertain = true
    return
  }
  state.queries += 1
  const records = await resolvePublicTxt(resolver, target)
  if (records === null) {
    state.uncertain = true
    return
  }
  const policies = records
    .map((parts) => parts.join(''))
    .filter((value) => /^v=spf1(?:\s|$)/i.test(value))
  if (records.length === 0) state.voids += 1
  if (policies.length !== 1) {
    state.issues.push(
      `${target} must publish exactly one SPF record for its include or redirect.`,
    )
    return
  }
  const child = policies[0] ?? ''
  state.issues.push(
    ...getPublicSpfIssues(child).map((issue) => `${target}: ${issue}`),
  )
  await visit(target, child)
}
