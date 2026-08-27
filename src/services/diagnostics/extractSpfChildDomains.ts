import { containsSpfMacro } from './containsSpfMacro'
import { extractSpfEffectiveLookupMechanisms } from './extractSpfEffectiveLookupMechanisms'

/**
 * Extracts the target domains of include: mechanisms and the redirect=
 * modifier — the references that form the SPF lookup tree.
 *
 * Two classes of reference are deliberately not expanded:
 * - a `redirect=` the receiver will ignore because the record has an `all`
 *   (RFC 7208 section 6.1); following it would show a subtree that never
 *   applies. Surfaced separately by `extractSpfIgnoredRedirect`.
 * - macro targets (`%{...}`), which are only known at evaluation time.
 *   Surfaced separately by `extractSpfMacroMechanisms`.
 */
export function extractSpfChildDomains(record: string): string[] {
  const domains: string[] = []
  for (const term of extractSpfEffectiveLookupMechanisms(record)) {
    if (containsSpfMacro(term)) continue
    if (term.startsWith('include:')) {
      domains.push(term.slice('include:'.length))
    } else if (term.startsWith('redirect=')) {
      domains.push(term.slice('redirect='.length))
    }
  }
  return domains.filter((domain) => domain.length > 0)
}
