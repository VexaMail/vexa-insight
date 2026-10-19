import type { SourceCause } from '@/types/ips'

/** One line per cause saying what the stored results show. */
export const SOURCE_CAUSE_HINTS: Record<SourceCause, string> = {
  'dmarc-pass': 'Passes DMARC, with SPF aligned or both identifiers aligned.',
  forwarding:
    'SPF fails but DKIM passes aligned: the pattern of forwarded mail.',
  'spf-unaligned':
    'Passes DMARC on DKIM; SPF passes for a domain other than From.',
  failing: 'Neither SPF nor DKIM passes aligned, so DMARC fails.',
  unknown: 'Results are mixed, or there are no messages in the window.',
}
