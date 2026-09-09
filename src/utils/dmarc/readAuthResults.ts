import type { DmarcRecordAuthResults } from '@/types/dmarc'

import { normalizeDkimResults } from './normalizeDkimResults'
import { normalizeSpfAuthResult } from './normalizeSpfAuthResult'

export function readAuthResults(
  rec: Record<string, unknown>,
  headerFrom: string,
): DmarcRecordAuthResults {
  const authResults = rec['auth_results'] as Record<string, unknown> | undefined
  const rawSpfAuth = (
    authResults?.['spf'] as Record<string, unknown> | undefined
  )?.['result']
  return {
    spfAuthResult: normalizeSpfAuthResult(rawSpfAuth),
    dkimAuthResults: normalizeDkimResults(authResults?.['dkim'], headerFrom),
  }
}
