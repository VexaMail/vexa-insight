import type { PublicSpfInspection } from '../../types/public-check/PublicSpfInspection'
import { isPublicDnsName } from '../diagnostics/isPublicDnsName'

export function readPublicSpfDependency(
  term: string,
  state: PublicSpfInspection,
): string | null {
  if (!/^(?:include:|redirect=)/i.test(term)) return null
  const target = term
    .replace(/^(?:include:|redirect=)/i, '')
    .toLowerCase()
    .replace(/\.$/, '')
  if (target.includes('%')) {
    state.uncertain = true
    return null
  }
  if (!isPublicDnsName(target)) {
    state.issues.push(
      'An SPF dependency targets a non-public or invalid DNS name.',
    )
    return null
  }
  return target
}
