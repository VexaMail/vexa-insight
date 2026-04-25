import type { SpfAuthResult } from '@/types/dmarc'

import { lowerTrim } from './lowerTrim'

export function normalizeSpfAuthResult(raw: unknown): SpfAuthResult {
  const s = lowerTrim(raw)
  switch (s) {
    case 'pass':
    case 'fail':
    case 'softfail':
    case 'permerror':
    case 'temperror':
    case 'neutral':
    case 'none':
      return s
    case 'perm_error':
      return 'permerror'
    case 'temp_error':
      return 'temperror'
    default:
      return 'none'
  }
}
