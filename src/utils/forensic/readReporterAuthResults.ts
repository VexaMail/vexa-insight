import type { HeaderBlock } from '@/types/forensic'

/**
 * The Authentication-Results values the reporting host itself added to the
 * reported message, joined; null when there are none. OpenDMARC puts only the
 * DMARC verdict in the feedback part and leaves SPF and DKIM here. Values from
 * other hosts are ignored: they judged a different hop.
 */
export function readReporterAuthResults(
  headers: HeaderBlock,
  reportingMta: string | null,
): string | null {
  if (reportingMta === null) return null
  const own = (headers.get('authentication-results') ?? []).filter(
    (value) => value.split(';')[0]?.trim().toLowerCase() === reportingMta,
  )
  return own.length === 0 ? null : own.join('; ')
}
