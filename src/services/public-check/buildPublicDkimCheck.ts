import type { Resolver } from 'node:dns/promises'
import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { KNOWN_SELECTORS } from '../diagnostics/knownSelectors'
import { describePublicDkimLookup } from './describePublicDkimLookup'
import { resolvePublicTxt } from './resolvePublicTxt'

export async function buildPublicDkimCheck(
  resolver: Resolver,
  domain: string,
  selector?: string,
): Promise<PublicCheck> {
  const answers = await Promise.all(
    (selector ? [selector] : KNOWN_SELECTORS).map(async (selector) => {
      const records = await resolvePublicTxt(
        resolver,
        `${selector}._domainkey.${domain}`,
      )
      return records?.map((record) => `${selector}: ${record.join('')}`) ?? null
    }),
  )
  const records = answers
    .flatMap((answer) => answer ?? [])
    .filter((record) => /(?:^|[;:])\s*p\s*=\s*[^;\s]+/.test(record))
  return {
    name: 'DKIM',
    status: 'unknown',
    dnsUnavailable: answers.some((answer) => answer === null),
    summary: describePublicDkimLookup(
      records.length,
      selector,
      answers.some((answer) => answer === null),
    ),
    recommendation:
      'DKIM selectors cannot be enumerated. A DNS key does not prove messages are signed. Confirm the selector with your provider and use DMARC reports to check authentication.',
    records,
  }
}
