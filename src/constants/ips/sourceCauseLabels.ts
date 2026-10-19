import type { SourceCause } from '@/types/ips'

export const SOURCE_CAUSE_LABELS: Record<SourceCause, string> = {
  'dmarc-pass': 'DMARC pass',
  forwarding: 'Likely forwarding',
  'spf-unaligned': 'DKIM only',
  failing: 'Fails SPF and DKIM',
  unknown: 'Mixed or unknown',
}
