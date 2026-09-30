/**
 * What an ARF child part carries, by content type: the feedback fields, the
 * reported message's headers, or neither.
 */
export function arfPartRole(type: string): 'feedback' | 'headers' | null {
  const lower = type.toLowerCase()
  if (lower === 'message/feedback-report') return 'feedback'
  if (lower === 'text/rfc822-headers' || lower === 'message/rfc822') {
    return 'headers'
  }
  return null
}
