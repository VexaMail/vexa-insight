import type { PublicDmarcPolicy } from '../../types/public-check/PublicDmarcPolicy'
import { deriveDmarcSummary } from '../diagnostics/deriveDmarcSummary'

export function parsePublicDmarcPolicy(record: string): PublicDmarcPolicy {
  const normalized = record.trim().replace(/^v\s*=\s*DMARC1/, 'v=DMARC1')
  const summary = deriveDmarcSummary([[normalized]])
  const issues = summary.dmarcWarnings.filter(
    (issue) => !issue.startsWith('Unknown tag '),
  )
  const versionTags = summary.dmarcTags.filter((tag) =>
    tag.tag.startsWith('v='),
  )
  if (versionTags.length > 1) issues.push('Multiple version tags were found.')
  const policy =
    summary.dmarcTags
      .find((tag) => tag.tag.startsWith('p='))
      ?.value.toLowerCase() ?? null
  const percentage = Number(
    summary.dmarcTags.find((tag) => tag.tag.startsWith('pct='))?.value ?? 100,
  )
  return {
    valid: issues.length === 0 && policy !== null,
    policy,
    percentage,
    issues,
  }
}
