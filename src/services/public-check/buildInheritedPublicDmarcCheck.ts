import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { buildPublishedDmarcCheck } from './buildPublishedDmarcCheck'
import { getPublicDmarcTags } from './getPublicDmarcTags'

export function buildInheritedPublicDmarcCheck(
  record: string,
  source: string,
): PublicCheck {
  const tags = getPublicDmarcTags(record)
  if (tags.has('np'))
    return {
      name: 'DMARC',
      status: 'unknown',
      points: null,
      summary: `Inherited DMARC candidate at ${source}.`,
      recommendation:
        'The record contains np=. Determining whether this author domain exists requires additional DNS evidence; its effective policy is not scored.',
      records: [record],
    }
  const effective = tags.get('sp') ?? tags.get('p') ?? 'none'
  const adapted = record.replace(/(^|;)\s*p\s*=[^;]*/i, `$1 p=${effective}`)
  const check = buildPublishedDmarcCheck(adapted)
  return {
    ...check,
    summary: `Inherited DMARC from ${source}. ${check.summary}`,
    recommendation: `${check.recommendation} Policy discovered with the RFC 9989 DNS tree walk; legacy PSL-based receivers may differ.`,
    records: [record],
  }
}
