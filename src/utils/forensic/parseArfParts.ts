import type { ArfPartIds, ForensicReport } from '@/types/forensic'
import type { DownloadedPartsResult } from '@/types/imap'
import { headerSectionOf } from './headerSectionOf'
import { parseForensicReport } from './parseForensicReport'

/**
 * Parses the downloaded ARF parts into a failure report; null when the
 * feedback part is missing or does not name a domain.
 */
export function parseArfParts(
  parts: DownloadedPartsResult,
  ids: ArfPartIds,
): ForensicReport | null {
  const feedback = parts[ids.feedbackPartId]?.content
  if (!feedback) return null
  const headers =
    ids.headersPartId === null ? null : parts[ids.headersPartId]?.content
  try {
    return parseForensicReport(
      feedback.toString('utf-8'),
      headers ? headerSectionOf(headers) : null,
    )
  } catch {
    return null
  }
}
