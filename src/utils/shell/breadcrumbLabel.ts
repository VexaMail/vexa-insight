import { BREADCRUMB_LABELS } from '@/constants/shell'

/**
 * Text of one breadcrumb: a known section name, otherwise the decoded segment
 * as written, so a domain or an IP keeps its case; long opaque ids shorten.
 */
export function breadcrumbLabel(segment: string): string {
  const known = BREADCRUMB_LABELS[segment]
  if (known) return known
  let decoded = segment
  try {
    decoded = decodeURIComponent(segment)
  } catch {
    // keep the raw segment
  }
  return decoded.length > 32 && /^[0-9a-f-]+$/i.test(decoded)
    ? `${decoded.slice(0, 10)}…`
    : decoded
}
