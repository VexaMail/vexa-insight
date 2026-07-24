import { extractSpfLookupMechanisms } from './extractSpfLookupMechanisms'

/**
 * Extracts the target domains of include: mechanisms and the redirect=
 * modifier — the references that form the SPF lookup tree.
 */
export function extractSpfChildDomains(record: string): string[] {
  const domains: string[] = []
  for (const term of extractSpfLookupMechanisms(record)) {
    if (term.startsWith('include:')) {
      domains.push(term.slice('include:'.length))
    } else if (term.startsWith('redirect=')) {
      domains.push(term.slice('redirect='.length))
    }
  }
  return domains.filter((domain) => domain.length > 0)
}
