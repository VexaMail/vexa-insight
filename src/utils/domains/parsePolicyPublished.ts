import type { PolicyPublishedFields } from '@/types/domains'
import { readXmlTag } from './readXmlTag'

/**
 * Reads `p`, `sp`, `pct`, `adkim` and `aspf` out of the `policy_published`
 * block of an aggregate report. Only the block itself is searched, so a `<p>`
 * elsewhere in the report cannot be mistaken for the policy.
 */
export function parsePolicyPublished(xml: string): PolicyPublishedFields {
  const start = xml.indexOf('<policy_published>')
  const end = xml.indexOf('</policy_published>')
  const block = start === -1 || end === -1 ? '' : xml.slice(start, end)
  const pct = readXmlTag(block, 'pct')
  const pctNumber = pct === null ? Number.NaN : Number(pct)
  return {
    policy: readXmlTag(block, 'p'),
    subdomainPolicy: readXmlTag(block, 'sp'),
    pct: Number.isFinite(pctNumber) ? pctNumber : null,
    adkim: readXmlTag(block, 'adkim'),
    aspf: readXmlTag(block, 'aspf'),
  }
}
