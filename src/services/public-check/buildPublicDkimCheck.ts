import type { Resolver } from 'node:dns/promises'
import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { KNOWN_SELECTORS } from '../diagnostics/knownSelectors'
import { resolvePublicTxt } from './resolvePublicTxt'

export async function buildPublicDkimCheck(
  resolver: Resolver,
  domain: string,
): Promise<PublicCheck> {
  const answers = await Promise.all(
    KNOWN_SELECTORS.map(async (selector) => {
      const records = await resolvePublicTxt(
        resolver,
        `${selector}._domainkey.${domain}`,
      )
      return records?.map((record) => `${selector}: ${record.join('')}`) ?? []
    }),
  )
  const records = answers
    .flat()
    .filter((record) => /(?:^|[;:])\s*p\s*=\s*[^;\s]+/.test(record))
  return {
    name: 'DKIM',
    status: 'unknown',
    summary:
      records.length > 0
        ? `${String(records.length)} candidate signing key records found.`
        : 'No signing key found at common selectors.',
    recommendation:
      'DKIM selectors cannot be enumerated. A DNS key does not prove messages are signed. Confirm the selector with your provider and use DMARC reports to check authentication.',
    records,
  }
}
