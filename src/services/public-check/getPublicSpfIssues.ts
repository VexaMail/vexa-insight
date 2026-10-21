import { validatePublicSpfTerm } from '@/validators/public-check'
import { extractSpfEffectiveLookupMechanisms } from '../diagnostics/extractSpfEffectiveLookupMechanisms'

export function getPublicSpfIssues(record: string): string[] {
  const terms = record.trim().split(/\s+/).slice(1)
  const issues = terms
    .map(validatePublicSpfTerm)
    .filter((issue): issue is string => issue !== null)
  const all = terms.find((term) => /^[+~?-]?all$/i.test(term))?.toLowerCase()
  if (all === 'all' || all === '+all')
    issues.push(
      'The all mechanism authorizes every sender. Confirm this policy with your provider.',
    )
  for (const modifier of ['redirect=', 'exp=']) {
    if (
      terms.filter((term) => term.toLowerCase().startsWith(modifier)).length > 1
    )
      issues.push(`Multiple ${modifier} modifiers were found.`)
  }
  const terminal = terms.findIndex((term) => /^[+~?-]?all$/i.test(term))
  const evaluated =
    terminal < 0 ? record : `v=spf1 ${terms.slice(0, terminal + 1).join(' ')}`
  if (extractSpfEffectiveLookupMechanisms(evaluated).length > 10)
    issues.push(
      'The policy exceeds ten direct DNS lookup mechanisms. Recursive dependencies are not included in this count.',
    )
  return issues
}
