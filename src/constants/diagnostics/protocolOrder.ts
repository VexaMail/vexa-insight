import type { DomainScoreCheck } from '@/types/diagnostics'

/** Order of the protocol tiles and dots: policy first, then its inputs. */
export const protocolOrder: readonly DomainScoreCheck['id'][] = [
  'dmarc',
  'spf',
  'dkim',
  'mtaSts',
  'tlsRpt',
  'bimi',
]
