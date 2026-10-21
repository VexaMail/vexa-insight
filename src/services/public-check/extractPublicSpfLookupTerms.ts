import { extractSpfEffectiveLookupMechanisms } from '../diagnostics/extractSpfEffectiveLookupMechanisms'
import { getEvaluatedPublicSpfRecord } from './getEvaluatedPublicSpfRecord'

export function extractPublicSpfLookupTerms(record: string): string[] {
  const evaluated = getEvaluatedPublicSpfRecord(record).toLowerCase()
  const ptr = evaluated
    .split(/\s+/)
    .slice(1)
    .map((term) => term.replace(/^[+~?-]/, ''))
    .filter((term) => /^ptr(?::|$)/.test(term))
  return [...extractSpfEffectiveLookupMechanisms(evaluated), ...ptr]
}
