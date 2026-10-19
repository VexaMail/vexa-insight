import type { FailureReason } from '@/types/domains'

/** How each reason for a DMARC failure reads in the insights panel. */
export const FAILURE_REASON_LABELS: Record<FailureReason['key'], string> = {
  'spf-auth': 'SPF did not pass',
  'spf-unaligned': 'SPF passed, not aligned',
  'dkim-none': 'No valid DKIM signature',
  'dkim-unaligned': 'DKIM passed, not aligned',
}
