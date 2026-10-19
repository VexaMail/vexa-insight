import type { SpfGeneratorPrefill } from '@/types/diagnostics'
import { isGeneratorSpfTerm } from './isGeneratorSpfTerm'

/**
 * The SPF form filled from the published record. Terms the generator cannot
 * express (`a:host`, `exists:`, `redirect=` ...) are listed, not dropped
 * silently. Without a record it starts from `mx ~all`.
 */
export function spfPrefillFromRecord(
  record: string | null,
): SpfGeneratorPrefill {
  const terms = (record ?? 'v=spf1 mx ~all').trim().split(/\s+/).slice(1)
  const plain = terms.map((term) => term.toLowerCase().replace(/^\+/, ''))
  const pick = (prefix: string) =>
    plain
      .filter((term) => term.startsWith(prefix))
      .map((term) => term.slice(prefix.length))
      .join(' ')
  return {
    fields: {
      includes: pick('include:'),
      ip4: pick('ip4:'),
      ip6: pick('ip6:'),
      a: plain.includes('a'),
      mx: plain.includes('mx'),
      all: plain.includes('-all') ? 'fail' : 'softfail',
    },
    unsupported: terms.filter((term) => !isGeneratorSpfTerm(term)),
  }
}
