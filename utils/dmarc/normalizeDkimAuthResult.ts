import type { DkimAuthResult } from '@/types/dmarc'

import { lowerTrim } from './lowerTrim'

export function normalizeDkimAuthResult(raw: unknown): DkimAuthResult {
  const s = lowerTrim(raw)
  switch (s) {
    case 'pass':
    case 'fail':
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
