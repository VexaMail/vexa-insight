import type { DkimRecord } from '@/types/diagnostics'
import { KNOWN_SELECTORS } from './knownSelectors'
import { resolveTxtSafe } from './resolveTxtSafe'

export async function probeDkim(domain: string): Promise<DkimRecord[]> {
  const results = await Promise.all(
    KNOWN_SELECTORS.map(async (selector) => {
      const hostname = `${selector}._domainkey.${domain}`
      const txt = await resolveTxtSafe(hostname)
      const flat = txt.flat().join('')
      if (flat.length === 0) {
        return { selector, record: null, valid: false }
      }
      const valid = flat.includes('v=DKIM1') && flat.includes('p=')
      return { selector, record: flat, valid }
    }),
  )
  // Return selectors that were found, plus a single placeholder for any not found
  return results
}
