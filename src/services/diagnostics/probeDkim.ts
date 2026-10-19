import type { DkimRecord } from '@/types/diagnostics'
import { KNOWN_SELECTORS } from './knownSelectors'
import { resolveTxtSafe } from './resolveTxtSafe'

/**
 * Looks up every selector of the fixed list plus the ones seen in reports,
 * reported first. Each answer says whether it holds a DKIM1 key.
 */
export async function probeDkim(
  domain: string,
  reportedSelectors: readonly string[] = [],
): Promise<DkimRecord[]> {
  const reported = new Set(reportedSelectors)
  const selectors = [
    ...reported,
    ...KNOWN_SELECTORS.filter((selector) => !reported.has(selector)),
  ]
  return Promise.all(
    selectors.map(async (selector) => {
      const txt = await resolveTxtSafe(`${selector}._domainkey.${domain}`)
      const flat = txt.flat().join('')
      const fromReports = reported.has(selector)
      if (flat.length === 0) {
        return { selector, record: null, valid: false, fromReports }
      }
      const valid = flat.includes('v=DKIM1') && flat.includes('p=')
      return { selector, record: flat, valid, fromReports }
    }),
  )
}
