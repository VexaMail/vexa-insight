import type { Resolver } from 'node:dns/promises'
import type { PublicSpfBranch } from '../../types/public-check/PublicSpfBranch'
import type { PublicSpfInspection } from '../../types/public-check/PublicSpfInspection'
import { extractPublicSpfLookupTerms } from './extractPublicSpfLookupTerms'
import { inspectPublicSpfTarget } from './inspectPublicSpfTarget'
import { readPublicSpfDependency } from './readPublicSpfDependency'

export async function inspectPublicSpfDependencies(
  resolver: Resolver,
  branch: PublicSpfBranch,
  state: PublicSpfInspection,
): Promise<void> {
  if (branch.ancestors?.has(branch.domain)) {
    state.issues.push(`SPF dependency cycle at ${branch.domain}.`)
    return
  }
  const ancestors = new Set([...(branch.ancestors ?? []), branch.domain])
  for (const term of extractPublicSpfLookupTerms(branch.record)) {
    state.lookups += 1
    if (state.lookups > 10) {
      state.issues.push(
        'The expanded SPF dependency tree can require more than ten DNS lookup terms. The actual evaluation path depends on the sender.',
      )
      return
    }
    const target = readPublicSpfDependency(term, state)
    if (target)
      await inspectPublicSpfTarget(
        resolver,
        target,
        state,
        async (domain, record) => {
          await inspectPublicSpfDependencies(
            resolver,
            { domain, record, ancestors },
            state,
          )
        },
      )
  }
}
