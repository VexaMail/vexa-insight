import type { SourceCause } from '@/types/ips'

/** Display order of the cause filters: what needs action first. */
export const SOURCE_CAUSE_ORDER: readonly SourceCause[] = [
  'failing',
  'unknown',
  'forwarding',
  'spf-unaligned',
  'dmarc-pass',
]
