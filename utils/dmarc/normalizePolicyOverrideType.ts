import type { PolicyOverrideType } from '@/types/dmarc'

import { lowerTrim } from './lowerTrim'

export function normalizePolicyOverrideType(raw: unknown): PolicyOverrideType {
  const s = lowerTrim(raw)
  switch (s) {
    case 'forwarded':
    case 'local_policy':
    case 'trusted_forwarder':
    case 'mailing_list':
    case 'sampled_out':
    case 'other':
      return s
    default:
      return 'other'
  }
}
