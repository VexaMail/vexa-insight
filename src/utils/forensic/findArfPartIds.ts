import type { ArfPartIds } from '@/types/forensic'
import { isWalkableBodyPart } from '@/utils/imap'
import { arfPartRole } from './arfPartRole'

/**
 * The ARF parts among the direct children of a `multipart/report`: the
 * `message/feedback-report` part and the reported headers, which senders
 * attach as `text/rfc822-headers` or as a whole `message/rfc822`. Null when
 * there is no feedback part.
 */
export function findArfPartIds(bodyStructure: unknown): ArfPartIds | null {
  if (!isWalkableBodyPart(bodyStructure)) return null
  const found: Record<'feedback' | 'headers', string | null> = {
    feedback: null,
    headers: null,
  }
  for (const [index, child] of (bodyStructure.childNodes ?? []).entries()) {
    const role = arfPartRole(child.type)
    if (role !== null) found[role] ??= child.partId ?? String(index + 1)
  }
  if (found.feedback === null) return null
  return { feedbackPartId: found.feedback, headersPartId: found.headers }
}
