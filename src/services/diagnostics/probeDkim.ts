import type { DkimRecord } from '@/types/diagnostics'
import { isDkimKeyRecord } from '@/validators/diagnostics'
import { KNOWN_SELECTORS } from './knownSelectors'
import { parseDkimRecord } from './parseDkimRecord'
import { resolveTxtSafe } from './resolveTxtSafe'
import { resolveWildcardDkimRevocation } from './resolveWildcardDkimRevocation'

/**
 * Looks up every selector of the fixed list plus the ones seen in reports,
 * reported first. Each answer says whether it holds a DKIM1 key.
 */
export async function probeDkim(
  domain: string,
  reportedSelectors: readonly string[] = [],
): Promise<DkimRecord[]> {
  const wildcardRevocation = await resolveWildcardDkimRevocation(domain)
  const reported = new Set(reportedSelectors)
  const selectors = [
    ...reported,
    ...KNOWN_SELECTORS.filter((selector) => !reported.has(selector)),
  ]
  return Promise.all(
    selectors.map(async (selector) => {
      const txt = await resolveTxtSafe(`${selector}._domainkey.${domain}`)
      const flat = txt.map((chunks) => chunks.join('')).join('; ')
      const fromReports = reported.has(selector)
      if (!isDkimKeyRecord(flat)) {
        return { selector, record: null, valid: false, fromReports }
      }
      if (
        !fromReports &&
        wildcardRevocation !== null &&
        flat.trim() === wildcardRevocation
      ) {
        return {
          selector,
          record: null,
          valid: false,
          fromReports,
          wildcardRevocation: true,
        }
      }
      const valid = parseDkimRecord({
        selector,
        record: flat,
        valid: txt.length === 1,
      }).valid
      return { selector, record: flat, valid, fromReports }
    }),
  )
}
