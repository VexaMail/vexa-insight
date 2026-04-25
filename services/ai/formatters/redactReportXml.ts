import { trimEdgePunctuation } from '@/utils/strings'
import crypto from 'node:crypto'

/**
 * Redacts PII from DMARC report XML before sending to an AI provider.
 * - IP addresses → hashed short identifiers (ip_xxxx).
 * - Email addresses → [redacted-email].
 * Preserves the rest of the XML structure for analysis.
 */
export function redactReportXml(xml: string): string {
  const ipMap = new Map<string, string>()
  let ipCounter = 0

  const ipRedacted = xml.replace(/\b(\d{1,3}\.){3}\d{1,3}\b/g, (match) => {
    const existing = ipMap.get(match)
    if (existing) return existing
    const hash = crypto
      .createHash('sha256')
      .update(match)
      .digest('hex')
      .slice(0, 6)
    const label = `ip_${hash}_${ipCounter++}`
    ipMap.set(match, label)
    return label
  })

  // Avoid a potentially catastrophic-backtracking regex by doing a lightweight
  // token scan instead of a complex pattern.
  const emailRedacted = ipRedacted
    .split(/\s+/)
    .map((token) => {
      if (!token.includes('@')) return token

      const trimmed = trimEdgePunctuation(token)
      const atIndex = trimmed.indexOf('@')
      if (atIndex <= 0 || atIndex === trimmed.length - 1) return token
      if (trimmed.indexOf('@', atIndex + 1) !== -1) return token

      return token.replace(trimmed, '[redacted-email]')
    })
    .join(' ')

  return emailRedacted
}
